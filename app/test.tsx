// app/test.tsx veya app/test.js
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { app } from "../constants/firebaseConfig";
import { db } from "../constants/firebaseConfig";


export default function TestPage() {
  const [status, setStatus] = useState("Firebase başlatılıyor...");

  useEffect(() => {
    if (app) {
      setStatus(" Firebase başarıyla yüklendi!");
    } else {
      setStatus(" Firebase yüklenemedi!");
    }
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18 }}>{status}</Text>
    </View>
  );
}
