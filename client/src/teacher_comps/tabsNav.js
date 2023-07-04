import Nav from 'react-bootstrap/Nav';

export default function TabsNav(props) {
   const setActiveTab =props.setActiveTab;
    return (
        <Nav variant="tabs" defaultActiveKey="/allStudents" onSelect={key => setActiveTab(key)}>
        <Nav.Item>
          <Nav.Link eventKey="/allStudents">הסטודנטים שלי</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/waiting">בהמתנה</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/un-active">לא פעילים</Nav.Link>
        </Nav.Item>
      </Nav>
      
    );
}

