import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';

const ToolBar = () => (
  <div className="flex">
    <InputGroup className="ml-24 mb-3 w-50 h-12">
      <Form.Control
        className="rounded-full border-none text-sm"
        placeholder="검색어를 입력하세요"
      />
      <InputGroup.Append>
        <InputGroup.Text className="text-gray-400 border-none bg-white h-12 rounded-br-full rounded-tr-full">
          <AiOutlineSearch />
        </InputGroup.Text>
      </InputGroup.Append>
    </InputGroup>
    <span className="bg-white rounded-full h-12 w-12 flex items-center cursor-pointer ml-4 mr-2">
      <BiBell className="m-auto text-gray-500" />
    </span>
    <span className="bg-white rounded-full h-12 w-12 flex items-center cursor-pointer mx-2">
      <BsFillPersonFill className="m-auto text-gray-500" />
    </span>
  </div>
);

export default ToolBar;
