import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Offcanvas from 'react-bootstrap/Offcanvas';

const ExampleOffcanvas = ({ className }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button onClick={() => setShow((s) => !s)} className={className}>
        Toggle offcanvas
      </Button>
      <Offcanvas placement="end" show={show} onHide={() => setShow(false)}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="h5">Offcanvas</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </div>

          <DropdownButton variant="secondary" title="Dropdown">
            <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
          </DropdownButton>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ExampleOffcanvas;