import React, { useState, useEffect } from 'react';
import { Container, Button, Input, Spacer, Text } from '@nextui-org/react';
import { simpleCrypto, AddCodeValue } from './encryption';


export default function Backend() {

  const [encryptedcodeValue, setencryptedcodeValue] = useState('');

  let EncryptedValue = "";
  let setNewEncryptedCodeValue;

  //adds a new code value in the code value array from encryption.js file (this function is executed on clicking the `Add New Code Value in JS Backend` button)

  function SETEncryptedCodeValue() {
    AddCodeValue(setNewEncryptedCodeValue);
    console.log("executed AddCode value");
  }

  //assigns encrypted version of quantity given in the `Encrypt quantity to code value` inputbox to encryptedcodevalue useState and displays it on the screen (Executes when clicking on the Encrypt value button);
  function printEncryptedCodeValue() {
    setencryptedcodeValue(EncryptedValue);
    console.log(EncryptedValue);
  }

  useEffect(() => {

  }, [EncryptedValue, setNewEncryptedCodeValue])

  return (
    <Container className=' bg-blue-100 min-h-screen rounded-sm' >
      <Text className=" uppercase p-3 font-bold flex justify-center text-2xl">
        Backend For Admins / [Shubham Sir]
      </Text>

      <Text className='flex justify-center'>
        Kept visible for the sake of testing, but it should be kept hidden
      </Text>

      <Spacer y={4} />

      <div className='p-2'>
        <Input
          bordered
          underlined
          labelPlaceholder="Set New Code Value"
          color="error"
          onChange={e => setNewEncryptedCodeValue = e.target.value}
          className="p-22 flex justify-center w-96"
        />

        <Button bordered color={"secondary"} onClick={SETEncryptedCodeValue} auto
          className="mt-4 m-auto">
          Add New Code Value in JS Backend
        </Button>

        <Spacer y={10} />

        <Input
          
          underlined
          labelPlaceholder="Encrypt Quantity to Code Value"
          color="error"
          // number/quantity  is encrypted and stored in Encrypted Value variable 
          onChange={e => EncryptedValue = simpleCrypto.encrypt(e.target.value)}
          className="p-22 flex justify-center w-96"
        />

        <Button bordered color={"secondary"} auto
          className="m-auto"
          onClick={printEncryptedCodeValue}
        >
          Encrypt Value
        </Button>
        <Text className="font-medium font-mono mt-4 m-auto flex justify-center"> Encrypted Code Value</Text>
        <Container xs>
          {/* Displays the encrypted code value set in the printEncryptedCodeValue() function  */}
          <Text className="font-extrabold text-xs font-mono mt-4 m-auto flex justify-center w-9">{encryptedcodeValue} </Text>
        </Container>
        <Spacer y={5} />
      </div>
    </Container>
  )
}

