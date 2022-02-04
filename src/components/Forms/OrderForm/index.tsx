import React, { useState } from "react";

import firestore from "@react-native-firebase/firestore";

import { Form, Title } from "./styles";
import { Input } from "@components/Controllers/Input";
import { Button } from "@components/Controllers/Button";
import { TextArea } from "@components/Controllers/TextArea";
import { Alert } from "react-native";

interface OrderFormProps {
  onSubmit(param: boolean): any;
}

export function OrderForm({ onSubmit }: OrderFormProps) {
  const [patrimony, setPatrimony] = useState("");
  const [equipament, setEquipament] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleNewOrder() {
    setIsLoading(true);
    firestore()
      .collection("orders")
      .add({
        patrimony,
        equipament,
        description,
        status: "open",
        created_at: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => Alert.alert("Chamado", "Chamado aberto com sucesso"))
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);

        onSubmit(true)
      });
  }

  return (
    <Form>
      <Title>Novo chamado</Title>
      <Input
        placeholder="Número do Patrimônio"
        keyboardType="default"
        onChangeText={setEquipament}
      />
      <Input
        placeholder="Equipamento"
        keyboardType="default"
        onChangeText={setPatrimony}
      />
      <TextArea placeholder="Descrição" onChangeText={setDescription} />

      <Button
        title="Enviar chamado"
        isLoading={isLoading}
        onPress={handleNewOrder}
      />
    </Form>
  );
}
