import React from "react";
import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

// Styles for the PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
    fontSize: 12,
  },
  header: {
    fontSize: 18,
    marginBottom: 10,
  },
  listItem: {
    fontSize: 12,
    marginVertical: 5,
  },
});

type PDFDocumentProps<T> = {
  title: string;
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
};

const PDFDocument = <T,>({ title, data, renderItem }: PDFDocumentProps<T>) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>{title}</Text>
      {data.map((item, index) => (
        <View key={index} style={styles.listItem}>
          {renderItem(item, index)}
        </View>
      ))}
    </Page>
  </Document>
);

export default PDFDocument;
