import React, { Component } from 'react';
import styled from 'styled-components';

interface TabProps {
    label: String;
    tabId: String;
}

class Tab extends Component<TabProps> {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export {Tab};

interface TabsComponentProps {
    default: String;
    children: Array<any>
}

interface TabsComponentState {
    activeTab: String;
}

const StyledTabsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    margin: 0;
    padding: 0;
`;

const StyledTabs = styled.ul`
    width: 100%;
    display: flex;
    justify-content: center;
    list-style: none;
    align-items: stretch;
    margin: 0;
    padding: 0;
    height: 30px;
`;

const StyledTab = styled.li`
    flex-basis: auto;
    flex-grow: 1;
    margin: 0;
    padding: 0;
    border-width: 1px 1px 0px 1px;
    border-style: solid;
    border-color: #D87E4A;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    > button {
        width: 100%;    
        background: none;
        border: none;
        height: 100%;
        color: #D87E4A;
        font-size: 15px;
        font-weight: bold;

        &:focus {
            outline: none;
        }
    }
`;

const StyledActiveTab = styled(StyledTab)`
    > button {
        background: #D87E4A;
        color: #222222;
    }
`;

const StyledTabPane = styled.div`
    background: #D87E4A;
`;

class Tabs extends Component<TabsComponentProps, TabsComponentState> {
    constructor(props: TabsComponentProps){
        super(props);
        this.state = {
            activeTab: this.props.default
        };
        this.onTabClick = this.onTabClick.bind(this);
    }

    onTabClick(tabId: String) {
        this.setState({activeTab: tabId});
    }

    render() {
        return(
            <StyledTabsWrapper>
                <StyledTabs>
                    {this.props.children.map((child: any) => {
                        if (child.props.tabId === this.state.activeTab) return (
                            <StyledActiveTab>
                                <button onClick={() => {this.onTabClick(child.props.tabId)}}>{child.props.label}</button>
                            </StyledActiveTab>
                        );
                        return (
                        <StyledTab>
                            <button onClick={() => {this.onTabClick(child.props.tabId)}}>{child.props.label}</button>
                        </StyledTab>)
                    })}
                </StyledTabs>
                <StyledTabPane>
                    {this.props.children.map((child: any) => {
                        if (child.props.tabId !== this.state.activeTab) return '';
                        return(
                            <div>
                                {child.props.children}
                            </div>
                        )
                    })}
                </StyledTabPane>
            </StyledTabsWrapper>            
        );            
    }
};

export default Tabs;