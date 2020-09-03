import axios from "axios";
import { application } from "../constants/appVariable";
import { ErrorHandler } from "../handlers/errorHandler";
import convert from "xml-js"

export const createClientRequest = async (client: any) => {
  const xmls = `<soapenv:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:examples:helloservice">
  <soapenv:Header/>
  <soapenv:Body>
     <urn:createClient soapenv:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
      <document xsi:type="xsd:string">${client.document}</document>
       <name xsi:type="xsd:string">${client.name}</name>
       <lastName xsi:type="xsd:string">${client.lastName}</lastName>
       <email xsi:type="xsd:string">${client.email}</email>
       <phone xsi:type="xsd:string">${client.phone}</phone>
       <auth_token xsi:type="xsd:string">${client.auth_token}</auth_token>
     </urn:createClient>
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
    const jsonResponse = convert.xml2js(data.data, options)['soap:Envelope']['soap:Body']['tns:createClientResponse'];
    const cli : any = {
        id : jsonResponse['tns:Cliente'].id._text,
        document : jsonResponse['tns:Cliente'].document._text,
        name : jsonResponse['tns:Cliente'].name._text,
        lastName : jsonResponse['tns:Cliente'].lastName._text,
        email : jsonResponse['tns:Cliente'].email._text,
        phone : jsonResponse['tns:Cliente'].phone._text
    }
    const message = jsonResponse["tns:message"]._text;
    return {cli , message}
  } catch (error) {
    throw error.statusCode ? error : new ErrorHandler(500, `${error.name} ${error.errmsg}`);
  }
};
