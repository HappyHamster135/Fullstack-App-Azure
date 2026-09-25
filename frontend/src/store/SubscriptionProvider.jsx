import { useCallback, useEffect, useReducer } from "react";
import { categoryApi } from "../api/CategoryApi.js";
import { getErrorMessage } from "../api/errors.js";
import { subscriptionApi } from "../api/SubscriptionApi.js";
import { useAuth } from "../auth/useAuth.js";
import { toIsoDate } from "../utils/format.js";
import { SubscriptionContext } from "./SubscriptionContext.js";
import {
  ACTIONS,
  initialState,
  subscriptionReducer,
} from "./subscriptionReducer.js";

function SubscriptionProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [state, dispatch] = useReducer(subscriptionReducer, initialState);

  //------------
  //-----Loading
  //------------

  const reload = useCallback(async () => {
    dispatch({ type: ACTIONS.loading });

    try {
      const [subscriptions, categories] = await Promise.all([
        subscriptionApi.getAll(),
        categoryApi.getAll(),
      ]);
      dispatch({ type: ACTIONS.loaded, subscriptions, categories });
    } catch (error) {
      dispatch({ type: ACTIONS.failed, error: getErrorMessage(error) });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      reload();
    } else {
      dispatch({ type: ACTIONS.reset });
    }
  }, [isAuthenticated, reload]);

  //------------------
  //-----Subscriptions
  //------------------

  const saveSubscription = (subscription) => {
    dispatch({ type: ACTIONS.subscriptionSaved, subscription });
    return subscription;
  };

  const createSubscription = async (values) =>
    saveSubscription(await subscriptionApi.create(values));

  const updateSubscription = async (id, values) =>
    saveSubscription(await subscriptionApi.update(id, values));

  const deleteSubscription = async (id) => {
    await subscriptionApi.remove(id);
    dispatch({ type: ACTIONS.subscriptionRemoved, id });
  };

  const registerPayment = async (id) => {
    await subscriptionApi.registerPayment(id, {
      paidOn: toIsoDate(new Date()),
    });
    return saveSubscription(await subscriptionApi.getById(id));
  };

  //---------------
  //-----Categories
  //---------------

  const saveCategory = (category) => {
    dispatch({ type: ACTIONS.categorySaved, category });
    return category;
  };

  const createCategory = async (values) =>
    saveCategory(await categoryApi.create(values));

  const updateCategory = async (id, values) =>
    saveCategory(await categoryApi.update(id, values));

  const deleteCategory = async (id) => {
    await categoryApi.remove(id);
    dispatch({ type: ACTIONS.categoryRemoved, id });
  };

  //-------------
  //-----Provider
  //-------------

  const value = {
    ...state,
    reload,
    createSubscription,
    updateSubscription,
    deleteSubscription,
    registerPayment,
    createCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export default SubscriptionProvider;
