import { createSelector } from "reselect";
import R from "ramda";

const getScans = (state: any) => state.applicationData.scans;
const getSorting = (state: any) => state.app.scansSorting;

export const sortScans = createSelector(
  getScans,
  getSorting,
  (scans, sorting) => {
    const data = R.values(scans);
    const sort = R.sortBy(R.prop(sorting));
    const reverseSort = R.compose(R.reverse, sort);
    return scans
      ? sorting === "createdAt" ? reverseSort(data) : sort(data)
      : null;
  }
);
