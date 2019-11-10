import { remote } from 'electron';
import path from 'path';

import React from 'react';
import { connect } from 'react-redux';

import {
	Tree,
	Card,
	Button,
	Menu,
	MenuItem,
	ContextMenu,
	Dialog,
	InputGroup,
	FormGroup,
	Classes,
	Intent,
	AnchorButton,
	ITreeNode,
} from '@blueprintjs/core';
import { IOffset } from '@blueprintjs/core/lib/esm/components/context-menu/contextMenu';
import { ScratchOrg } from 'common/data/orgs';
import { StoreState } from 'common/store/state';
import { addProject, removeProject } from 'common/store/actions/project';
import { setOrgNickname } from 'common/store/actions/org';
import { ProjectConfig } from 'common/data/projects';
import { openOrg } from 'common/api/sfdx';
import ExpirationNotice from './ExpirationNotice';

// A good example
// https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d
interface StateProps {
	orgList: ScratchOrg[];
	projectList: ProjectConfig[];
	nicknames: Record<string, string>;
	isDark: boolean;
}

interface OwnProps {
	orgUsername?: string;
	onOrgSelect: (selectedUsername: string) => void;
}

interface DispatchProps {
	addProject(projectDir: string): void;
	removeProject(projectDir: string): void;
	setOrgNickname(username: string, nickname: string): void;
}

interface State {
	expandedGroups: Record<string, boolean>;

	isRenameModelOpen: boolean;
	renameUsername: string;
	renameValue: string;
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: StoreState): StateProps => ({
	orgList: Object.values(state.org.scratchOrgs),
	projectList: Object.values(state.project.projectMap),
	nicknames: state.org.nicknames,
	isDark: state.settings.theme === 'dark',
});

const actions = {
	addProject,
	removeProject,
	setOrgNickname,
};

enum NodeTreeDataType {
	ORG,
	PROJECT,
	UTILITY,
}

interface NodeTreeData {
	type: NodeTreeDataType;
	projectDir?: string;
	username?: string;
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
class Sidebar extends React.PureComponent<Props, State> {
	private static willExpire(expirationDate: Date) {
		const tolerance = 7;
		return (
			(new Date(expirationDate).valueOf() - new Date().valueOf()) / 1000 / 60 / 60 / 24 <= tolerance
		);
	}

	constructor(props: Props) {
		super(props);

		this.state = {
			expandedGroups: {},
			isRenameModelOpen: false,
			renameUsername: '',
			renameValue: '',
		};

		this.createOrgNode = this.createOrgNode.bind(this);

		this.handleRenameOpen = this.handleRenameOpen.bind(this);
		this.handleRenameClose = this.handleRenameClose.bind(this);
		this.handleRenameSave = this.handleRenameSave.bind(this);
		this.handleRenameValueUpdate = this.handleRenameValueUpdate.bind(this);

		this.handleNodeClick = this.handleNodeClick.bind(this);
		this.handleNodeExpand = this.handleNodeExpand.bind(this);
		this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
		this.handleContextMenu = this.handleContextMenu.bind(this);
		this.handleAddProject = this.handleAddProject.bind(this);
	}

	private setExpansion(nodeId: string, expanded: boolean): void {
		this.setState((state) => ({
			expandedGroups: {
				...state.expandedGroups,
				[nodeId]: expanded,
			},
		}));
	}

	private handleNodeCollapse(nodeData: ITreeNode) {
		this.setExpansion(nodeData.id as string, false);
	}

	private handleContextMenu(
		node: ITreeNode<NodeTreeData>,
		_: number[],
		e: React.MouseEvent<HTMLElement>,
	) {
		e.preventDefault();
		const offset = { left: e.clientX, top: e.clientY };

		const { nodeData } = node;
		if (nodeData) {
			switch (nodeData.type) {
				case NodeTreeDataType.ORG:
					this.createOrgMenu(nodeData, offset);
					break;
				case NodeTreeDataType.PROJECT:
					this.createProjectMenu(nodeData, offset);
					break;
				default:
					break;
			}
		}
	}

	private handleNodeExpand(nodeData: ITreeNode) {
		this.setExpansion(nodeData.id as string, true);
	}

	private handleNodeClick(node: ITreeNode<NodeTreeData>) {
		const { onOrgSelect } = this.props;
		const nodeId = node.id as string;
		const { nodeData } = node;

		if (nodeData && nodeData.type === NodeTreeDataType.ORG && nodeData.username) {
			onOrgSelect(nodeData.username);
		}

		if (node.hasCaret) {
			this.toggleExpansion(nodeId);
		}
	}

	private handleAddProject() {
		const { addProject: addProjectAction } = this.props;

		remote.dialog
			.showOpenDialog({
				properties: ['openDirectory'],
			})
			.then(({ filePaths }) => {
				if (filePaths.length > 0) {
					addProjectAction(filePaths[0]);
				}
			})
			.catch(console.error);
	}

	private createProjectMenu(nodeData: NodeTreeData, offset: IOffset) {
		const { removeProject: removeProjectAction, isDark } = this.props;
		const { projectDir } = nodeData;

		const menu = (
			<Menu>
				{projectDir && (
					<MenuItem text="Remove Project" onClick={() => removeProjectAction(projectDir)} />
				)}
			</Menu>
		);

		ContextMenu.show(menu, offset, undefined, isDark);
	}

	private createOrgMenu(nodeData: NodeTreeData, offset: IOffset) {
		const { isDark } = this.props;
		const { username } = nodeData;

		if (username) {
			const menu = (
				<Menu>
					<MenuItem text="Open" onClick={() => openOrg(username)} />
					<MenuItem text="Rename" onClick={() => this.handleRenameOpen(username)} />
				</Menu>
			);

			ContextMenu.show(menu, offset, undefined, isDark);
		}
	}

	private createOrgNode(org: ScratchOrg): ITreeNode<NodeTreeData> {
		const { orgUsername, nicknames } = this.props;
		const id = `org-${org.username}`;

		return {
			id,
			label: nicknames[org.username] || org.alias || org.username,
			secondaryLabel: Sidebar.willExpire(org.expirationDate) && (
				<ExpirationNotice expirationDate={new Date(org.expirationDate)} />
			),
			hasCaret: false,
			isSelected: orgUsername === org.username,
			icon: <span className="flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter" />,
			nodeData: {
				type: NodeTreeDataType.ORG,
				username: org.username,
			},
		};
	}

	private createUtilityNode(
		id: string,
		label: string,
		childNodes: Array<ITreeNode<NodeTreeData>>,
	): ITreeNode<NodeTreeData> {
		const { expandedGroups } = this.state;

		return {
			id,
			label,
			childNodes,
			isExpanded: Boolean(expandedGroups[id]),
			icon: 'folder-close',
			hasCaret: childNodes.length > 0,
			nodeData: {
				type: NodeTreeDataType.UTILITY,
			},
		};
	}

	private createProjectNode(
		project: ProjectConfig,
		childNodes: Array<ITreeNode<NodeTreeData>>,
	): ITreeNode<NodeTreeData> {
		const { expandedGroups } = this.state;
		const id = `project-${project.projectDir}`;

		return {
			id,
			label: path.basename(project.projectDir),
			childNodes,
			isExpanded: Boolean(expandedGroups[id]),
			icon: 'folder-close',
			hasCaret: childNodes.length > 0,
			nodeData: {
				type: NodeTreeDataType.PROJECT,
				projectDir: project.projectDir,
			},
		};
	}

	private buildOrgTree(): Array<ITreeNode<NodeTreeData>> {
		interface Group {
			project: ProjectConfig;
			orgs: ScratchOrg[];
		}

		const { projectList, orgList } = this.props;

		const orgGroups: Group[] = [];
		const usernameMap = new Map<string, Group>();
		const ungrouped: ScratchOrg[] = [];

		// for each project create lookups from the username to the project
		projectList.forEach((project) => {
			const group = { project, orgs: [] };
			orgGroups.push(group);
			project.orgUsernames.forEach((username) => {
				usernameMap.set(username, group);
			});
		});

		// add each username to a project
		orgList.forEach((org) => {
			const group = usernameMap.get(org.username);
			if (group) {
				group.orgs.push(org);
			} else {
				ungrouped.push(org);
			}
		});

		const nodes = orgGroups.map(({ project, orgs }) =>
			this.createProjectNode(project, orgs.map(this.createOrgNode)),
		);

		if (ungrouped.length > 0) {
			nodes.push(
				this.createUtilityNode('ungrouped', 'Ungrouped', ungrouped.map(this.createOrgNode)),
			);
		}

		return nodes;
	}

	private handleRenameValueUpdate(event: React.ChangeEvent<HTMLInputElement>) {
		this.setState({
			renameValue: event.target.value,
		});
	}

	private handleRenameSave() {
		const { renameUsername, renameValue } = this.state;
		const { setOrgNickname: setOrgNicknameAction } = this.props;

		this.setState({
			isRenameModelOpen: false,
		});
		setOrgNicknameAction(renameUsername, renameValue);
	}

	private handleRenameClose() {
		this.setState({ isRenameModelOpen: false });
	}

	private handleRenameOpen(username: string) {
		this.setState((state, props) => ({
			isRenameModelOpen: true,
			renameUsername: username,
			renameValue: props.nicknames[username] || '',
		}));
	}

	private toggleExpansion(nodeId: string) {
		this.setState((state) => ({
			expandedGroups: {
				...state.expandedGroups,
				[nodeId]: !state.expandedGroups[nodeId],
			},
		}));
	}

	private renderRenameDialog() {
		const { isDark } = this.props;
		const { isRenameModelOpen, renameValue } = this.state;

		let dialogStyles = '';
		if (isDark) {
			dialogStyles += 'bp3-dark';
		}

		return (
			<Dialog className={dialogStyles} isOpen={isRenameModelOpen}>
				<div className={Classes.DIALOG_BODY}>
					<FormGroup label="Set Nickname">
						<InputGroup value={renameValue} onChange={this.handleRenameValueUpdate} />
					</FormGroup>
				</div>
				<div className={Classes.DIALOG_FOOTER}>
					<div className={Classes.DIALOG_FOOTER_ACTIONS}>
						<Button onClick={this.handleRenameClose}>Close</Button>
						<AnchorButton onClick={this.handleRenameSave} intent={Intent.PRIMARY}>
							Set Name
						</AnchorButton>
					</div>
				</div>
			</Dialog>
		);
	}

	public render() {
		return (
			<>
				{this.renderRenameDialog()}
				<Card className="flex-auto ml-4 pt-4 mb-0 p-0 h-full">
					<Tree
						contents={this.buildOrgTree()}
						onNodeClick={this.handleNodeClick}
						onNodeCollapse={this.handleNodeCollapse}
						onNodeExpand={this.handleNodeExpand}
						onNodeContextMenu={this.handleContextMenu}
					/>
					<div className="flex justify-center relative bottom-0">
						<Button
							className="m-5 mt-10"
							text="Associate Project Folder"
							onClick={this.handleAddProject}
						/>
					</div>
				</Card>
			</>
		);
	}
}

export default connect(mapStateToProps, actions)(Sidebar);
