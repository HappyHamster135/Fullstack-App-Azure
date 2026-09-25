//----------
//-----State
//----------

export const ACTIONS = {
  loading: "loading",
  loaded: "loaded",
  failed: "failed",
  reset: "reset",
  subscriptionSaved: "subscriptionSaved",
  subscriptionRemoved: "subscriptionRemoved",
  categorySaved: "categorySaved",
  categoryRemoved: "categoryRemoved",
};

export const initialState = {
  subscriptions: [],
  categories: [],
  isLoading: true,
  error: "",
};

//------------
//-----Reducer
//------------

export function subscriptionReducer(state, action) {
  switch (action.type) {
    case ACTIONS.loading:
      return { ...state, isLoading: true, error: "" };

    case ACTIONS.loaded:
      return {
        ...state,
        isLoading: false,
        subscriptions: [...action.subscriptions].sort(byNextPayment),
        categories: [...action.categories].sort(byName),
      };

    case ACTIONS.failed:
      return { ...state, isLoading: false, error: action.error };

    case ACTIONS.reset:
      return initialState;

    case ACTIONS.subscriptionSaved:
      return {
        ...state,
        subscriptions: upsert(state.subscriptions, action.subscription).sort(
          byNextPayment,
        ),
      };

    case ACTIONS.subscriptionRemoved:
      return {
        ...state,
        subscriptions: state.subscriptions.filter((s) => s.id !== action.id),
      };

    case ACTIONS.categorySaved:
      return {
        ...state,
        categories: upsert(state.categories, action.category).sort(byName),
        subscriptions: state.subscriptions.map((s) =>
          s.category.id === action.category.id
            ? { ...s, category: action.category }
            : s,
        ),
      };

    case ACTIONS.categoryRemoved:
      return {
        ...state,
        categories: state.categories.filter((c) => c.id !== action.id),
      };

    default:
      throw new Error(`Okänd action: ${action.type}`);
  }
}

//------------
//-----Helpers
//------------

function upsert(items, item) {
  const exists = items.some((current) => current.id === item.id);

  return exists
    ? items.map((current) => (current.id === item.id ? item : current))
    : [...items, item];
}

function byNextPayment(a, b) {
  return a.nextPaymentDate.localeCompare(b.nextPaymentDate);
}

function byName(a, b) {
  return a.name.localeCompare(b.name, "sv");
}
