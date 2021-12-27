export const NAVIGATE_TRENDING_POST = "TRENDING_THINGS_NAVIGATE_TRENDING_POST";
export const NAVIGATE_TRENDING_WALL = "TRENDING_THINGS_NAVIGATE_TRENDING_WALL";
export const NAVIGATE_BACK = "TRENDING_THINGS_NAVIGATE_BACK";
export const NAVIGATE_USER_PROFILE = "TRENDING_THINGS_NAVIGATE_USER_PROFILE";
export const NAVIGATE_TO_SETTINGS = "TRENDING_THINGS_NAVIGATE_TO_SETTINGS";
export const RESET_NAVIGATION = "TRENDING_THINGS_RESET_NAVIGATION";
export const NAVIGATE_TO_EDIT_POST = "NAVIGATE_TO_EDIT_POST";

export const SR_NAVIGATE_TRENDING_POST = "SR_NAVIGATE_TRENDING_POST";
export const SR_NAVIGATE_BACK = "SR_NAVIGATE_BACK";
export const SR_NAVIGATE_USER_PROFILE = "SR_NAVIGATE_USER_PROFILE";
export const SR_NAVIGATE_TO_EDIT_POST = "SR_NAVIGATE_TO_EDIT_POST";

export const N_NAVIGATE_TRENDING_POST = "N_NAVIGATE_TRENDING_POST";
export const N_NAVIGATE_BACK = "N_NAVIGATE_BACK";
export const N_NAVIGATE_USER_PROFILE = "N_NAVIGATE_USER_PROFILE";
export const N_NAVIGATE_TO_EDIT_POST = "N_NAVIGATE_TO_EDIT_POST";

export const M_NAVIGATE_TRENDING_POST = "M_NAVIGATE_TRENDING_POST";
export const M_NAVIGATE_BACK = "M_NAVIGATE_BACK";
export const M_NAVIGATE_USER_PROFILE = "M_NAVIGATE_USER_PROFILE";
export const M_NAVIGATE_TO_EDIT_POST = "M_NAVIGATE_TO_EDIT_POST";

export const navigateToEditPost = (documentId: any) => ({
  type: NAVIGATE_TO_EDIT_POST,
  documentId
});

export const srNavigateToEditPost = (documentId: any) => ({
  type: SR_NAVIGATE_TO_EDIT_POST,
  documentId
});

export const navigateToTrendingPost = (params?: any) => ({
  type: NAVIGATE_TRENDING_POST,
  params
});

export const navigateToTrendingWall = () => ({
  type: NAVIGATE_TRENDING_WALL
});

export const navigateBack = () => ({
  type: NAVIGATE_BACK
});

export const navigateToUserProfile = (params?: any) => ({
  type: NAVIGATE_USER_PROFILE,
  params
});

export const navigateToSettings = () => ({
  type: NAVIGATE_TO_SETTINGS
});

export const resetNavigation = () => ({
  type: RESET_NAVIGATION
});

export const srNavigateToTrendingPost = (params?: any) => ({
  type: SR_NAVIGATE_TRENDING_POST,
  params
});

export const srNavigateBack = () => ({
  type: SR_NAVIGATE_BACK
});

export const srNavigateToUserProfile = (params?: any) => ({
  type: SR_NAVIGATE_USER_PROFILE,
  params
});

export const nNavigateToTrendingPost = (params?: any) => ({
  type: N_NAVIGATE_TRENDING_POST,
  params
});

export const nNavigateBack = () => ({
  type: N_NAVIGATE_BACK
});

export const nNavigateToUserProfile = (params?: any) => ({
  type: N_NAVIGATE_USER_PROFILE,
  params
});

export const nNavigateToEditPost = (documentId: any) => ({
  type: N_NAVIGATE_TO_EDIT_POST,
  documentId
});

export const mNavigateToTrendingPost = (params?: any) => ({
  type: M_NAVIGATE_TRENDING_POST,
  params
});

export const mNavigateBack = () => ({
  type: M_NAVIGATE_BACK
});

export const mNavigateToUserProfile = (params?: any) => ({
  type: M_NAVIGATE_USER_PROFILE,
  params
});

export const mNavigateToEditPost = (documentId: any) => ({
  type: M_NAVIGATE_TO_EDIT_POST,
  documentId
});

export const onUserPress = (userId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const tabNavigation = state.trendingThingsNav.tabNavigation;

  if (tabNavigation.state.index === 3) {
    dispatch(mNavigateToUserProfile({ userId }));
  } else if (tabNavigation.state.index === 4) {
    dispatch(nNavigateToUserProfile({ userId }));
  } else if (tabNavigation.state.index === 6) {
    dispatch(srNavigateToUserProfile({ userId }));
  } else {
    dispatch(navigateToUserProfile({ userId }));
  }
};

export const onPostPress = (documentId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const tabNavigation = state.trendingThingsNav.tabNavigation;

  if (tabNavigation.state.index === 3) {
    dispatch(
      mNavigateToTrendingPost({
        documentId
      })
    );
  } else if (tabNavigation.state.index === 4) {
    dispatch(
      nNavigateToTrendingPost({
        documentId
      })
    );
  } else if (tabNavigation.state.index === 6) {
    dispatch(
      srNavigateToTrendingPost({
        documentId
      })
    );
  } else {
    dispatch(
      navigateToTrendingPost({
        documentId
      })
    );
  }
};

export const onEditPost = (documentId: number) => (
  dispatch: any,
  getState: any
) => {
  const state = getState();
  const tabNavigation = state.trendingThingsNav.tabNavigation;

  if (tabNavigation.state.index === 3) {
    dispatch(mNavigateToEditPost(documentId));
  } else if (tabNavigation.state.index === 4) {
    dispatch(nNavigateToEditPost(documentId));
  } else if (tabNavigation.state.index === 6) {
    dispatch(srNavigateToEditPost(documentId));
  } else {
    dispatch(navigateToEditPost(documentId));
  }
};
