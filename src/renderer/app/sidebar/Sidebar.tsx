import { remote } from 'electron';
import path from 'path';

import React from 'react';
import { connect } from 'react-redux';

import {
	ITreeNode,
	Tree,
	Card,
	Button,
	Menu,
	MenuItem,
	ContextMenu,
	Dialog
} from '@blueprintjs/core';
import { IOffset } from '@blueprintjs/core/lib/esm/components/context-menu/contextMenu';
import { ScratchOrg } from 'common/data/orgs';
import { StoreState } from 'common/store/state';
import { addProject, removeProject } from 'common/store/actions/project';
import { ProjectConfig } from 'common/data/projects';
import { ExpirationNotice } from './ExpirationNotice';
import { openOrg } from 'common/api/sfdx';

// A good example
// https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d
interface StateProps {
	orgList: ScratchOrg[];
	projectList: ProjectConfig[];
}

interface OwnProps {
	orgUsername?: string;
	onOrgSelect: (selectedUsername: string) => void;
	isDark: boolean;
}

interface DispatchProps {
	addProject(projectDir: string): void;
	removeProject(projectDir: string): void;
}

interface State {
	expandedGroups: { [orgName: string]: boolean };

	isRenameModelOpen: boolean;
	renameUsername: string;
	renameValue: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: StoreState): StateProps => ({
	orgList: Object.values(state.org.scratchOrgs),
	projectList: Object.values(state.project.projectMap)
});

const actions = {
	addProject,
	removeProject
};

enum NodeTreeDataType {
	ORG,
	PROJECT,
	UTILITY
}

interface NodeTreeData {
	type: NodeTreeDataType;
	projectDir?: string;
	username?: string;
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
class Sidebar extends React.PureComponent<Props, State> {
	constructor(props: Props) {
		super(props);

		this.createOrgNode = this.createOrgNode.bind(this);

		this.state = {
			expandedGroups: {},
			isRenameModelOpen: false,
			renameUsername: '',
			renameValue: ''
		};
	}

	public render() {
		return (
			<>
				{this.renderRenameDialog()}
				<Card id='sidebar' className='flex-auto ml-4 pt-4 mb-0 p-0 h-full'>
					<Tree
						contents={this.buildOrgTree()}
						onNodeClick={this.handleNodeClick}
						onNodeCollapse={this.handleNodeCollapse}
						onNodeExpand={this.handleNodeExpand}
						onNodeContextMenu={this.handleContextMenu}
					/>
					<div className='flex justify-center relative bottom-0'>
						<Button
							className='m-5 mt-10'
							text='Add Project Folder'
							onClick={this.handleAddProject}></Button>
					</div>
				</Card>
			</>
		);
	}

	private renderRenameDialog() {
		let dialogStyles = '';
		if (this.props.isDark) {
			dialogStyles += 'bp3-dark';
		}

		return (
			<Dialog className={dialogStyles} isOpen={this.state.isRenameModelOpen}>
				<Button
					onClick={() =>
						this.setState({ ...this.state, isRenameModelOpen: false })
					}>
					Close
				</Button>
			</Dialog>
		);
	}

	private buildOrgTree(): Array<ITreeNode<NodeTreeData>> {
		interface Group {
			project: ProjectConfig;
			orgs: ScratchOrg[];
		}

		const orgGroups = new Array<Group>();
		const usernameMap = new Map<string, Group>();
		const ungrouped = new Array<ScratchOrg>();

		// for each project create lookups from the username to the project
		for (const project of this.props.projectList) {
			const group = { project, orgs: [] };
			orgGroups.push(group);
			for (const username of project.orgUsernames) {
				usernameMap.set(username, group);
			}
		}

		// add each username to a project
		for (const org of this.props.orgList) {
			const group = usernameMap.get(org.username);
			if (group) {
				group.orgs.push(org);
			} else {
				ungrouped.push(org);
			}
		}

		const nodes = orgGroups.map(({ project, orgs }) =>
			this.createProjectNode(project, orgs.map(this.createOrgNode))
		);

		if (ungrouped.length > 0) {
			nodes.push(
				this.createUtilityNode(
					'ungrouped',
					'Ungrouped',
					ungrouped.map(this.createOrgNode)
				)
			);
		}

		return nodes;
	}

	private createProjectNode(
		project: ProjectConfig,
		childNodes: Array<ITreeNode<NodeTreeData>>
	): ITreeNode<NodeTreeData> {
		const id = `project-${project.projectDir}`;

		return {
			id,
			label: path.basename(project.projectDir),
			childNodes,
			isExpanded: Boolean(this.state.expandedGroups[id]),
			icon: 'folder-close',
			hasCaret: childNodes.length > 0,
			nodeData: {
				type: NodeTreeDataType.PROJECT,
				projectDir: project.projectDir
			}
		};
	}

	private createUtilityNode(
		id: string,
		label: string,
		childNodes: Array<ITreeNode<NodeTreeData>>
	): ITreeNode<NodeTreeData> {
		return {
			id,
			label,
			childNodes,
			isExpanded: Boolean(this.state.expandedGroups[id]),
			icon: 'folder-close',
			hasCaret: childNodes.length > 0,
			nodeData: {
				type: NodeTreeDataType.UTILITY
			}
		};
	}

	private createOrgNode(org: ScratchOrg): ITreeNode<NodeTreeData> {
		const id = `org-${org.username}`;

		return {
			id,
			label: org.alias || org.username,
			secondaryLabel: this.willExpire(org.expirationDate) && (
				<ExpirationNotice
					expirationDate={new Date(org.expirationDate)}></ExpirationNotice>
			),
			hasCaret: false,
			isSelected: this.props.orgUsername === id,
			icon: (
				<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>
			),
			nodeData: {
				type: NodeTreeDataType.ORG,
				username: org.username
			}
		};
	}

	private handleNodeClick = (
		node: ITreeNode<NodeTreeData>,
		_: number[],
		e: React.MouseEvent<HTMLElement>
	) => {
		const nodeId = node.id as string;
		const nodeData = node.nodeData;

		if (
			nodeData &&
			nodeData.type === NodeTreeDataType.ORG &&
			nodeData.username
		) {
			this.props.onOrgSelect(nodeData.username);
		}

		if (node.hasCaret) {
			this.setExpansion(nodeId, !this.state.expandedGroups[nodeId]);
		}
	}

	private handleNodeCollapse = (nodeData: ITreeNode) => {
		this.setExpansion(nodeData.id as string, false);
	}

	private handleNodeExpand = (nodeData: ITreeNode) => {
		this.setExpansion(nodeData.id as string, true);
	}

	private handleContextMenu = (
		node: ITreeNode<NodeTreeData>,
		_: number[],
		e: React.MouseEvent<HTMLElement>
	) => {
		e.preventDefault();
		const offset = { left: e.clientX, top: e.clientY };

		const nodeData = node.nodeData;
		if (nodeData) {
			if (nodeData.type === NodeTreeDataType.ORG) {
				this.createOrgMenu(nodeData, offset);
			} else {
				this.createProjectMenu(nodeData, offset);
			}
		}
	}

	private createOrgMenu(nodeData: NodeTreeData, offset: IOffset) {
		const username = nodeData.username;

		const menu = (
			<Menu>
				{username && <MenuItem text='Open' onClick={() => openOrg(username)} />}
				<MenuItem
					text='Rename'
					onClick={() =>
						this.setState({ ...this.state, isRenameModelOpen: true })
					}
				/>
			</Menu>
		);

		ContextMenu.show(menu, offset, undefined, this.props.isDark);
	}

	private createProjectMenu(nodeData: NodeTreeData, offset: IOffset) {
		const projectDir = nodeData.projectDir;

		const menu = (
			<Menu>
				{projectDir && (
					<MenuItem
						text='Remove Project'
						onClick={() => this.props.removeProject(projectDir)}
					/>
				)}
			</Menu>
		);

		ContextMenu.show(menu, offset, undefined, this.props.isDark);
	}

	private handleAddProject = () => {
		remote.dialog.showOpenDialog(
			{
				properties: ['openDirectory']
			},
			(dirs: string) => {
				if (dirs.length > 0) {
					this.props.addProject(dirs[0]);
				}
			}
		);
	}

	private setExpansion(nodeId: string, expanded: boolean) {
		const newExpandedGroups = { ...this.state.expandedGroups }; // shallow clone

		if (expanded) {
			newExpandedGroups[nodeId] = true;
		} else {
			delete newExpandedGroups[nodeId];
		}

		this.setState({
			...this.state,
			expandedGroups: newExpandedGroups
		});
	}

	private willExpire(expirationDate: Date) {
		const tolerance = 7;
		return (
			(new Date(expirationDate).valueOf() - new Date().valueOf()) /
				1000 /
				60 /
				60 /
				24 <=
			tolerance
		);
	}
}

export default connect(
	mapStateToProps,
	actions
)(Sidebar);
