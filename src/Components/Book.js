import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const Book = ({ title, onClick }) => {
    return (_jsxs("div", { style: {
            display: "inline-block",
            textAlign: "center",
            cursor: "pointer",
        }, onClick: onClick, children: [_jsx("img", { src: "/assets/book.png", alt: title, style: { width: "100px" } }), _jsx("p", { children: title })] }));
};
export default Book;
