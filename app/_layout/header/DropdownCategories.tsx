'use client'; // This is crucial
import { Dropdown, DropdownButton } from 'react-bootstrap';

export default function DropdownCategories() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Dropdown button"  className="select-active">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </DropdownButton>
  );
}