import axios from "axios";
import { application } from "../constants/appVariable";
import { ErrorHandler } from "../handlers/errorHandler";
const convert = require('xml-js');

export const rechargeWalletRequest = async (object: any) => {
  const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:rechargeWallet soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
         <document xsi:type="xsd:string">${object.document}</document>
       <phone xsi:type="xsd:string">${object.phone}</phone>
       <value xsi:type="xsd:number">${object.value}</value>
       <auth_token xsi:type="xsd:string">${object.auth_token}</auth_token>
     </urn:rechargeWallet>
  </soapenv:Body>
</soapenv:Envelope>

 `;
  try {
    const soap_url = `${application.soap_url}/client`;
    const header = { "Content-Type": "text/xml" };
    const data = await axios.post(soap_url, xmls, {
      headers: header
    });
    var options = {compact: true, ignoreComment: true, spaces: 4};
    const jsonResponse = convert.xml2js(data.data, options)['soap:Envelope']['soap:Body']['tns:rechargeWalletResponse'];
    const balance = Number(jsonResponse["tns:balance"]._text);
    const message = jsonResponse["tns:message"]._text;
    return {balance , message}
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};
