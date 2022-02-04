import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

import auth from "@react-native-firebase/auth";

import { FooterButton } from "@components/Controllers/FooterButton";
import { Button } from "@components/Controllers/Button";
import { Input } from "@components/Controllers/Input";
import { Form, Title, Footer } from "./styles";
import { Alert } from "react-native";

export function SignInForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigation = useNavigation();

  function handleSignIn() {
    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Login", "Bem vindo");
      })
      .catch((error) => {
        setIsLoading(false);
        Alert.alert("Erro ao tentar realizar login", "Tente novamente");
        console.log("deu ruim", error);
      })
      .finally();
  }

  function handleForgotPassword() {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Password", "Enviamos um email para redefinir sua senha");
      })
      .catch((error) => console.log("deu ruim", error))
      .finally();
  }

  return (
    <Form>
      <Title>Entrar</Title>
      <Input placeholder="E-mail" onChangeText={setEmail} />
      <Input placeholder="Senha" secureTextEntry onChangeText={setPassword} />
      <Button title="Entrar" onPress={handleSignIn} isLoading={isLoading} />

      <Footer>
        <FooterButton
          title="Criar conta"
          icon="person-add"
          onPress={() => navigation.navigate("register")}
        />
        <FooterButton
          title="Esqueci senha"
          icon="email"
          onPress={handleForgotPassword}
        />
      </Footer>
    </Form>
  );
}
