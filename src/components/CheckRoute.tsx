import { useIonRouter } from "@ionic/react";

import { Fragment, useEffect } from "react";
import { useAppState } from "store";

const CheckRoute: React.FC = () => {
  const showTab = ["/home", "/manageProduct", "/product", "/scan", "/profile"];
  const location = useIonRouter();
  const setShowTab = useAppState((state) => state.setShowTab);
  useEffect(() => {
    if (location.routeInfo.pathname) {
      setShowTab(showTab.includes(location.routeInfo.pathname));
    }
  }, [location.routeInfo]);

  return <Fragment></Fragment>;
};

export default CheckRoute;
