import axios from "axios";
import { application } from "../constants/appVariable";
import { ErrorHandler } from "../handlers/errorHandler";
import convert from "xml-js";

export const createTransactionRequest = async (object: any) => {
  const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:transactionservice">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:createTransaction soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
       <document xsi:type="xsd:string">${object.document}</document>
       <phone xsi:type="xsd:string">${object.phone}</phone>
       <value xsi:type="xsd:number">${object.value}</value>
       <auth_token xsi:type="xsd:string">${object.auth_token}</auth_token>
     </urn:createTransaction>
  </soapenv:Body>
</soapenv:Envelope>
`;
  try {
    const soap_url = `${application.soap_url}/transaction`;
    const header = { "Content-Type": "text/xml" };
    const data = await axios.post(soap_url, xmls, {
      headers: header
    });
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const jsonResponse = convert.xml2js(data.data, options)['soap:Envelope']['soap:Body']['tns:createTransactionResponse'];
    const session_id = jsonResponse["tns:session_id"]._text;
    const message = jsonResponse["tns:message"]._text;
    return {session_id , message}
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};
