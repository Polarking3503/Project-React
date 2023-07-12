import React from 'react'
import { PDFDownloadLink, Text, Document, Page } from "@react-pdf/renderer";
import Button from 'react-bootstrap/esm/Button';
import iconSave from '../img/iconSave.svg';

const MyDoc = ({ metadata }) => {
  return (
    <Document>
      <Page wrap style={{ padding: 20 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 500,
            padding: 2,
            marginBottom: 10,
            textAlign: 'center'
          }}
        >
          Tema del curso
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 400, padding: 2 }}>
          Nombre del Tema:
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 400, padding: 2, paddingLeft: 6 }}>
          {metadata?.nombreTema}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 400, padding: 2 }}>
          Descripción del Tema:
        </Text>
        <Text style={{ fontSize: 14, fontWeight: 400, padding: 2, paddingLeft: 6 }}>
          {metadata?.contenido}
        </Text>
      </Page>
    </Document>
  );
};

export default function DescargarMetaDoc({ tema }) {
  return (
    <>
      <Button variant="outline-primary">
        <PDFDownloadLink
          document={<MyDoc metadata={tema} />}
          fileName={`Metadatos ${tema?.nombreTema}`}
          // style={{ color: "#C20E30", textDecoration: "none" }}
        >
          {({ blob, url, loading, error }) =>
            loading ? "" : ""
          }
          <img src={iconSave} alt="iconSave" />
        </PDFDownloadLink>
      </Button>
    </>
  );
}
