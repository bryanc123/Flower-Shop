import { render, screen } from "../test-utils";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import ProductList from "../components/ProductList";
import { HashRouter as Router } from 'react-router-dom';
import { waitFor } from "@testing-library/react";


global.scrollTo = jest.fn();


test('renders ProductList', () => {
    render(<ProductList />, { wrapper: Router });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
})

test('displays 2 products that match search term "da"', async () => {
    render(<ProductList />, { wrapper: Router });

    userEvent.type(screen.getByRole("textbox"), "da");

    await waitFor(() => {
        const productCards = screen.getAllByRole("img");

        expect(productCards).toHaveLength(2);
    })
});

test('display message if no products that match search term were found', async () => {
    render(<ProductList />, { wrapper: Router });

    userEvent.type(screen.getByRole("textbox"), "!");

    await waitFor(() => {
        expect(screen.getByText("Sorry, no products that match your query were found!")).toBeInTheDocument();
    });
});
