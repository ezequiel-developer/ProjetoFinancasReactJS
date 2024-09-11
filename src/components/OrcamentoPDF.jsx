import React, { useContext } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #000',
    marginBottom: 20,
    paddingBottom: 10,
  },
  logo: {
    width: 87,
    height: 'auto',
  },
  contactInfo: {
    flex: 1,
    alignItems: 'center',
  },
  contactText: {
    fontSize: 14,
  },
  statusDate: {
    fontSize: 14,
    textAlign: 'right',
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
  },
  total: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    padding: 8,
    justifyContent: 'space-between',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    padding: 4,
  },
  tableCellHeader: {
    fontWeight: 'bold',
  },
});

// Componente PDF
const OrcamentoPDF = ({ orcamento, formatCurrency, formatDate }) => {

  const total = orcamento.itens.reduce((acc, item) => acc + item.valor, 0);

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header com logo e informações de contato */}
        <View style={styles.header}>
          <Image
            src="https://ezequiel-developer.github.io/ProjetoFinancasReactJS/logo_estofaria.jpg"
            style={styles.logo}
          />
          <View style={styles.contactInfo}>
            <Text style={styles.contactText}>Âncora Capotaria & <br /> Estofaria Náutica</Text>

            <Text style={styles.contactText}>Instagram: @estofaria.ancora</Text>
            <Text style={styles.contactText}>WhatsApp: 47 9 9961-4459</Text>
          </View>
          <View>
            <Text style={styles.statusDate}>Data: {formatDate(orcamento.data)}</Text>
            <Text style={styles.statusDate}>Status: {orcamento.status}</Text>
          </View>
        </View>

        {/* Dados do Cliente */}
        <View style={styles.section}>
          <Text style={styles.title}>Dados do Cliente</Text>
          <View style={{ borderBottom: '1px solid #000', paddingBottom: 8 }}>
            <Text style={styles.text}>Nome: {orcamento.cliente}</Text>
            <Text style={styles.text}>Telefone: {orcamento.telefone}</Text>
          </View>
        </View>

        {/* Serviços */}
        <View style={styles.section}>
          <Text style={styles.title}>Serviços</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Serviço</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Descrição</Text>
              <Text style={[styles.tableCell, styles.tableCellHeader]}>Valor</Text>
            </View>
            {orcamento.itens.map((item) => (
              <View key={item.id} style={styles.tableRow}>
                <Text style={styles.tableCell}>{item.servico}</Text>
                <Text style={styles.tableCell}>{item.descricao}</Text>
                <Text style={styles.tableCell}>{formatCurrency(item.valor)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Total */}
        <View style={styles.section}>
          <Text style={styles.total}>Total: {formatCurrency(total)}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrcamentoPDF;
