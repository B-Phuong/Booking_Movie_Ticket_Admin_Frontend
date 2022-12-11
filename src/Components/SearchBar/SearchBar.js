import { Col, FloatingLabel, Form } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
export const SearchBar = ({ filterText, onFilter, placeholder }) => {
    return (
        <div style={{
            background: "rgb(36, 47, 64)",
            padding: "10px 0px 10px 18px",
            display: "flex"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <FaSearch style={{ color: "white" }} />
            </div>

            {/* <input
                style={{
                    background: "white",
                    border: "none",
                    borderRadius: "6px",
                    marginLeft: "6px"
                }}
                type="search"
                width="300px"
                height="80px"
                placeholder={placeholder}
                value={filterText}
                onChange={onFilter}
                autoFocus
            /> */}
            <Form.Group as={Col} md="6" controlId="validationCustom01">
                <FloatingLabel
                    controlId="floatingInput"
                    label={placeholder}

                >
                    <Form.Control
                        required
                        type="search"
                        name="tenPhim"
                        value={filterText}
                        onChange={onFilter}
                        autoFocus
                    />
                </FloatingLabel>
            </Form.Group>
        </div>)
};