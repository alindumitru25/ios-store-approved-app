import { createSelector } from "reselect";
import R from "ramda";

export const getReactionsCount = createSelector(
  document => document,
  (document: any) =>
    (document.qualityFeedback || 0) +
    (document.goodPriceFeedback || 0) +
    (document.goodQualityPriceRatioFeedback || 0) +
    (document.worthItFeedback || 0) +
    (document.expensiveFeedback || 0) +
    (document.badQualityFeedback || 0)
);
