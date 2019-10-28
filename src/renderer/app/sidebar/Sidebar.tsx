import { remote } from 'electron';

import React from 'react';
import { connect } from 'react-redux';

import { ITreeNode, Tree, Card, Button, Callout } from '@blueprintjs/core';
import { ScratchOrg } from 'common/data/orgs';
import { StoreState } from 'common/store/state';
import { addProject } from 'common/store/actions/project';
import { ProjectConfig } from 'common/data/projects';
import { ExpirationNotice } from './ExpirationNotice';

// A good example
// https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d
interface StateProps {
	orgList: ScratchOrg[];
	projectMap: { [orgName: string]: ProjectConfig };
}

interface OwnProps {
	orgUsername?: string;
	onOrgSelect: (selectedUsername: string) => void;
}

interface DispatchProps {
	addProject(projectDir: string): void;
}

interface State {
	expandedGroups: {[orgName: string]: boolean};
}

type Props = StateProps & DispatchProps & OwnProps;

const mapStateToProps = (state: StoreState): StateProps => ({
	orgList: Object.values(state.org.scratchOrgs),
	projectMap: state.project.projectMap
});

const actions = {
	addProject
};

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
class Sidebar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.state = {
			expandedGroups: {}
		};
	}

	public render() {
		return (
			<Card id='sidebar' className='flex-auto ml-4 pt-4 mb-0 p-0 h-full'>
				<Tree
					contents={this.buildOrgTree()}
					onNodeClick={this.handleNodeClick}
					onNodeCollapse={this.handleNodeCollapse}
					onNodeExpand={this.handleNodeExpand}
				/>
				<div className='flex justify-center relative bottom-0'>
					<Button 
						className='m-5 mt-10' text='Add Project Folder' onClick={this.handleAddProject}></Button>
				</div>
			</Card>
		);
	}

	private buildOrgTree(): ITreeNode[] {
		const orgGroups: { [orgName: string]: ScratchOrg[] } = {};

		for (const org of this.props.orgList) {
			const group = orgGroups[org.orgName] || (orgGroups[org.orgName] = []);
			group.push(org);
		}

		return Object.entries(orgGroups).map(([orgName, orgList]) =>
			this.createParentNode(
				orgName,
				orgName,
				orgList.map((org) => this.createChildNode(org.username, org.alias, org.expirationDate))
			)
		);
	}

	private createParentNode(
		id: string,
		label: string,
		childNodes: ITreeNode[]
	): ITreeNode {
		return {
			id,
			label,
			childNodes,
			isExpanded: Boolean(this.state.expandedGroups[id]),
			icon: 'folder-close',
			hasCaret: true
		};
	}

	private createChildNode(id: string, label: string, expirationDate: Date): ITreeNode {
		return {
			id,
			label,
			secondaryLabel: this.willExpire(expirationDate) ?
				<ExpirationNotice expirationDate={new Date(expirationDate)}></ExpirationNotice> :
				undefined,
			hasCaret: false,
			isSelected: this.props.orgUsername === id,
			icon: (
				<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>
			)
		};
	}

	private handleNodeClick = (
		nodeData: ITreeNode,
		_nodePath: number[],
		e: React.MouseEvent<HTMLElement>
	) => {
		const nodeId = nodeData.id as string;

		if (!nodeData.hasCaret) { // we will need a better solution
			this.props.onOrgSelect(nodeId);
		} else {
			this.setExpansion(nodeId, !this.state.expandedGroups[nodeId]);
		}
	}

	private handleNodeCollapse = (nodeData: ITreeNode) => {
		this.setExpansion(nodeData.id as string, false);
	}

	private handleNodeExpand = (nodeData: ITreeNode) => {
		this.setExpansion(nodeData.id as string, true);
	}

	private handleAddProject = () => {
		remote.dialog.showOpenDialog({
			properties: ['openDirectory']
		}, (dirs: string) => {
			if (dirs.length > 0) {
				this.props.addProject(dirs[0]);
			}
		});
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
		return (new Date(expirationDate).valueOf() - new Date().valueOf()) / 1000 / 60 / 60 / 24 <= tolerance;
	}
}

export default connect(mapStateToProps, actions)(Sidebar);
