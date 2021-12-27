import * as React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView
} from "react-native";
import _ from "lodash";
import KickStarter from "./../kickStarter/KickStarter";
import TrendingWallPost from "./TrendingWallPost";
import { LOCALHOST_IMAGES } from "./../../utils/Globals";

interface Props {
  documents: any;
  linedStyle?: boolean;
  navigation?: any;
  pageId?: any;
  forUserId?: number;
}

interface State {
  items: any;
}

interface StateProps {}

type ClassProps = Props & StateProps;

class Posts extends React.Component<ClassProps, State> {
  constructor(props: ClassProps) {
    super(props);

    // to array for virtualization
    this.state = {
      items: _.values(this.props.documents)
    };

    this.renderPost = this.renderPost.bind(this);
    this.keyExtract = this.keyExtract.bind(this);
  }

  componentWillReceiveProps(nextProps: Props) {
    this.setState({
      items: _.values(nextProps.documents)
    });
  }

  keyExtract(item: any) {
    return item.id;
  }

  renderPost(item: any) {
    return (
      <TrendingWallPost
        document={item}
        key={item.id}
        linedStyle={this.props.linedStyle}
        pageId={this.props.pageId}
        forUserId={this.props.forUserId}
      />
    );
  }

  renderPosts() {
    if (!this.state.items) {
      return null;
    }

    return (
      <ScrollView>
        {this.state.items.map((item: any) => this.renderPost(item))}
      </ScrollView>
    );
  }

  render() {
    return <View>{this.renderPosts()}</View>;
  }
}

const mapStateToProps = (state: any) => ({});

export default connect<StateProps, {}, Props>(mapStateToProps)(Posts);
