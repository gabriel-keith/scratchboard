import React from 'react';
import { Classes, Icon, Intent, ITreeNode, Position, Tooltip, Tree, Card } from '@blueprintjs/core';
import { ScratchOrg, ScratchOrgAttributes } from 'common/data/orgs';

export interface SidebarTreeState {
	nodes: ITreeNode[];
}

// use Component so it re-renders everytime: `nodes` are not a primitive type
// and therefore aren't included in shallow prop comparison
export class Sidebar extends React.Component<{}, SidebarTreeState> {
	public nodes: ITreeNode[] = this.loadNodes();
	public state: SidebarTreeState = { nodes: this.nodes };
	private idCount = 0;

	public render() {
		return (
			<Card id='sidebar' className='flex-auto ml-4 mb-0 h-full'>
				<Tree
					contents={this.state.nodes}
					onNodeClick={this.handleNodeClick}
					onNodeCollapse={this.handleNodeCollapse}
					onNodeExpand={this.handleNodeExpand}
				/>
			</Card>			
		);
	}

	private loadParentNodes(): ITreeNode[] {
		let orgTypes = ['LLC_BI', 'nRETAIL', 'nFORCE'];
		return (
			orgTypes.map(function(org) {
				let parentNode: ITreeNode = {
					id: org,
					hasCaret: true,
					icon: 'folder-close',
					label: org
				}
				return parentNode;
				})
		);

	}

	private loadChildrenNodes(pNode) {
		let childrenList: ITreeNode[] = [];
		let testdate = new Date();
		let att: ScratchOrgAttributes = {
			type: 'LLC_BI',
			url: 'https://google.com'
		};
		let orgList: ScratchOrg[] = [{
			username: 'string',
			orgId: 'string',
			accessToken: 'string',
			instanceUrl: 'string',
			loginUrl: 'string',
			clientId: 'string',
			alias: 'string',
			lastUsed: testdate,
			createdOrgInstance: 'LLC_BI',
			created: 'string',
			devHubUsername: 'string',
			connectedStatus: 'string',
			attributes: att,
			orgName: 'LLC_BI_1',
			status: 'string',
			createdBy: 'string',
			createdDate: 'string',
			expirationDate: testdate,
			edition: 'string',
			signupUsername: 'string',
			devHubOrgId: 'string',
			isExpired: false
		},
		{
			username: 'string',
			orgId: 'string',
			accessToken: 'string',
			instanceUrl: 'string',
			loginUrl: 'string',
			clientId: 'string',
			alias: 'string',
			lastUsed: testdate,
			createdOrgInstance: 'LLC_BI',
			created: 'string',
			devHubUsername: 'string',
			connectedStatus: 'string',
			attributes: att,
			orgName: 'LLC_BI_2',
			status: 'string',
			createdBy: 'string',
			createdDate: 'string',
			expirationDate: testdate,
			edition: 'string',
			signupUsername: 'string',
			devHubOrgId: 'string',
			isExpired: false
		},
		{
			username: 'string',
			orgId: 'string',
			accessToken: 'string',
			instanceUrl: 'string',
			loginUrl: 'string',
			clientId: 'string',
			alias: 'string',
			lastUsed: testdate,
			createdOrgInstance: 'nRETAIL',
			created: 'string',
			devHubUsername: 'string',
			connectedStatus: 'string',
			attributes: att,
			orgName: 'nRETAIL_1',
			status: 'string',
			createdBy: 'string',
			createdDate: 'string',
			expirationDate: testdate,
			edition: 'string',
			signupUsername: 'string',
			devHubOrgId: 'string',
			isExpired: false
		},
		{
			username: 'string',
			orgId: 'string',
			accessToken: 'string',
			instanceUrl: 'string',
			loginUrl: 'string',
			clientId: 'string',
			alias: 'string',
			lastUsed: testdate,
			createdOrgInstance: 'nFORCE',
			created: 'string',
			devHubUsername: 'string',
			connectedStatus: 'string',
			attributes: att,
			orgName: 'nFORCE_1',
			status: 'string',
			createdBy: 'string',
			createdDate: 'string',
			expirationDate: testdate,
			edition: 'string',
			signupUsername: 'string',
			devHubOrgId: 'string',
			isExpired: false
		}];
		orgList.map(org => {
				if(pNode.label === org.createdOrgInstance){
					let childrenNode: ITreeNode = {
						id: org.orgName,
						hasCaret: false,
						icon: (<span className='flip-h bp3-tree-node-icon bp3-icon-standard bp3-icon-key-enter'></span>),
						label: org.orgName
					};
					childrenList.push(childrenNode);
				}
			});
		
		return childrenList;
	}

	private loadNodes() {
		let parentNodes: ITreeNode[] = this.loadParentNodes();

		parentNodes.forEach(pNode => {
			pNode.childNodes = this.loadChildrenNodes(pNode);
		});

		return parentNodes;
	}

	private handleNodeClick = (nodeData: ITreeNode, _nodePath: number[], e: React.MouseEvent<HTMLElement>) => {
		const originallySelected = nodeData.isSelected;
		if (!e.shiftKey) {
			this.forEachNode(this.state.nodes, n => (n.isSelected = false));
		}
		nodeData.isSelected = originallySelected == null ? true : !originallySelected;
		nodeData.isExpanded = !nodeData.isExpanded;
		this.setState(this.state);
	}

	private handleNodeCollapse = (nodeData: ITreeNode) => {
		nodeData.isExpanded = false;
		this.setState(this.state);
	}

	private handleNodeExpand = (nodeData: ITreeNode) => {
		nodeData.isExpanded = true;
		this.setState(this.state);
	}

	private forEachNode(nodes: ITreeNode[], callback: (node: ITreeNode) => void) {
		if (nodes == null) {
			return;
		}

		for (const node of nodes) {
			callback(node);
			this.forEachNode(node.childNodes, callback);
		}
	}
}

const INITIAL_STATE: ITreeNode[] = [
	{
		id: 0,
		hasCaret: true,
		icon: "folder-close",
		label: "Folder 0",
	},
	{
		id: 1,
		icon: "folder-close",
		isExpanded: true,
		label: (
		'truthtown'),
		childNodes: [
			{
				id: 2,
				icon: "document",
				label: "Item 0",
				secondaryLabel: (
					<Tooltip content="An eye!">
						<Icon icon="eye-open" />
					</Tooltip>
				),
			},
			{
				id: 3,
				icon: <Icon icon="tag" intent={Intent.PRIMARY} className={Classes.TREE_NODE_ICON} />,
				label: "Organic meditation gluten-free, sriracha VHS drinking vinegar beard man.",
			},
			{
				id: 4,
				hasCaret: true,
				icon: "folder-close",
				label: (
					<Tooltip content="foo" position={Position.RIGHT}>
				Folder 2
				</Tooltip>
				),
				childNodes: [
					{ id: 5, label: "No-Icon Item" },
					{ id: 6, icon: "tag", label: "Item 1" },
					{
						id: 7,
						hasCaret: true,
						icon: "folder-close",
						label: "Folder 3",
						childNodes: [
							{ id: 8, icon: "document", label: "Item 0" },
							{ id: 9, icon: "tag", label: "Item 1" },
						],
					},
				],
			},
		],
	},
	{
		id: 2,
		hasCaret: true,
		icon: "folder-close",
		label: "Super secret files",
		disabled: true,
	},
];
/* tslint:enable:object-literal-sort-keys */