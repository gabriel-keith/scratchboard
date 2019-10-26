import React from 'react';
import { connect } from 'react-redux';

import { ITreeNode, Tree, Card } from '@blueprintjs/core';
import { ScratchOrg } from 'common/data/orgs';
import { StoreState } from 'common/store/state';

// A good example
// https://medium.com/knerd/typescript-tips-series-proper-typing-of-react-redux-connected-components-eda058b6727d
interface StateProps {
	orgList: ScratchOrg[];
}

interface OwnProps {
	selectedUsername?: string;
	onOrgSelect: (selectedUsername: string) => void;
}

type Props = StateProps & OwnProps;

interface State {
	expandedGroups: {[orgName: string]: boolean};
}

function mapStateToProps(state: StoreState): StateProps {
	return {
		orgList: Object.values(state.org.scratchOrgs)
	};
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
class Sidebar extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);

		this.handleNodeClick = this.handleNodeClick.bind(this);
		// this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
		// this.handleNodeExpand = this.handleNodeExpand.bind(this);

		this.state = {
			expandedGroups: {}
		};
	}

	public render() {
		return (
			<Card id='sidebar' className='flex-auto ml-4 mb-0 h-full'>
				<Tree
					contents={this.buildOrgTree()}
					onNodeClick={this.handleNodeClick}
					// onNodeCollapse={this.handleNodeCollapse}
					// onNodeExpand={this.handleNodeExpand}
				/>
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
				orgList.map((org) => this.createChildNode(org.username, org.alias))
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

	private createChildNode(id: string, label: string): ITreeNode {
		return {
			id,
			label,
			hasCaret: false,
			isSelected: this.props.selectedUsername === id,
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
		this.props.onOrgSelect(nodeId);

		const newExpandedGroups = { ...this.state.expandedGroups }; // shallow clone

		// toggle selection
		if (newExpandedGroups[nodeId]) {
			delete newExpandedGroups[nodeId];
		} else {
			newExpandedGroups[nodeId] = true;
		}

		this.setState({
			...this.state,
			expandedGroups: newExpandedGroups
		});
	}

	// private handleNodeCollapse = (nodeData: ITreeNode) => {
	// 	this.setState({

	// 	});
	// }

	// private handleNodeExpand = (nodeData: ITreeNode) => {
	// 	nodeData.isExpanded = true;
	// 	this.setState(this.state);
	// }
}

export default connect(mapStateToProps)(Sidebar);
