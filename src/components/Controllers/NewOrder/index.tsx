import React, { useRef } from "react";
import {
  BottomSheetView,
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { Background } from "./styles";
import { Button } from "@components/Controllers/Button";
import { OrderForm } from "@components/Forms/OrderForm";

export function NewOrder() {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  function handleSnapPress() {
    bottomSheetRef.current?.present();
  }

  function handleSnapClose(isSubmit: boolean) {
    if (isSubmit) {
      bottomSheetRef.current?.close();
    }
  }

  return (
    <>
      <Button title="Novo chamado" onPress={handleSnapPress} />

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetRef}
          snapPoints={["65%"]}
          style={{ padding: 24 }}
          enablePanDownToClose={true}
          backdropComponent={() => <Background />}
        >
          <BottomSheetView>
            <OrderForm
              onSubmit={(isSubmit: boolean) => {
                handleSnapClose(isSubmit);
              }}
            />
          </BottomSheetView>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  );
}
