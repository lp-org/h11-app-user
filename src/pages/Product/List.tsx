import {
  IonButton,
  IonContent,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  RefresherEventDetail,
} from "@ionic/react";

import Toolbar from "components/Toolbar.tsx";
import { add, archive } from "ionicons/icons";

import {
  useArchivedProduct,
  useProductList,
  useProductPagination,
} from "hooks/useProduct";
import { useHistory } from "react-router";
import Image from "components/Image";
import { t, Trans } from "@lingui/macro";
import React, { useState } from "react";
import { Product } from "types/product";

const ProductList: React.FC = () => {
  const [type, setType] = useState<string>("active");
  const [keyword, setKeyword] = useState<string | undefined | null>();
  const archivedProduct = useArchivedProduct();
  const {
    data: products,
    refetch,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useProductPagination({ keyword, type });
  // setRecords((prevRecords) => [...prevRecords, ...products?.result]);
  const history = useHistory();

  async function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    await refetch();
    event.detail.complete();
  }
  return (
    <IonPage>
      <Toolbar
        title={t({ id: "Product List" })}
        defaultHref="/"
        action={
          <IonButton fill="solid" onClick={() => history.push("/product/add")}>
            <IonIcon icon={add} style={{ color: "#fff" }} />
          </IonButton>
        }
      />

      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>

        <IonSegment
          value={type}
          color="primary"
          onIonChange={(e) => setType(e.target.value || "active")}
        >
          <IonSegmentButton value="active">
            <IonLabel className="ion-text-capitalize">
              <Trans>Active Products</Trans>
            </IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="archived">
            <IonLabel className="ion-text-capitalize">
              <Trans>Archived Products</Trans>
            </IonLabel>
          </IonSegmentButton>
        </IonSegment>

        <IonList lines="full" className="ion-padding">
          <IonSearchbar
            placeholder={t({ id: "Search" })}
            value={keyword}
            onIonChange={(e) => setKeyword(e.target.value)}
          />

          {products?.pages.map((group, i) => (
            <React.Fragment key={i}>
              {group?.result?.map((product) => (
                <IonItemSliding>
                  <IonItem key={product.prd_code}>
                    <div className="ion-margin-end">
                      <Image imgSrc={product.prd_image} width={80} />
                    </div>

                    <IonLabel
                      onClick={() =>
                        history.push(`/product/${product.prd_code}`)
                      }
                    >
                      <b>{product.prd_name}</b>
                      <div>
                        <small>
                          <Trans>Product ID</Trans>: {product.prd_code}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Category</Trans>: {product.prd_category}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Type</Trans>: {product.prd_type}{" "}
                        </small>
                      </div>
                      <div>
                        <small>
                          <Trans>Flavour</Trans>: {product.prd_flavour}{" "}
                        </small>
                      </div>
                    </IonLabel>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption
                      color={!product.prd_archived ? "primary" : "danger"}
                      className="text-white"
                      onClick={() =>
                        archivedProduct.mutate({
                          id: product.prd_code,
                          prd_archived: product.prd_archived ? 0 : 1,
                        })
                      }
                    >
                      <IonIcon
                        slot="top"
                        icon={archive}
                        style={{ marginBottom: 10 }}
                      ></IonIcon>
                      <Trans>
                        {!product.prd_archived
                          ? t({ id: "Archive" })
                          : t({ id: "Unarchive" })}
                      </Trans>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))}
            </React.Fragment>
          ))}

          {hasNextPage && (
            <div>
              <IonButton
                expand="block"
                className="text-white ion-margin-top"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? <>Loading</> : <Trans>Load More</Trans>}
              </IonButton>
            </div>
          )}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ProductList;
