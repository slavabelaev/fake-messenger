import React from "react";
import {BrowserRouter as Router} from "react-router-dom";
import {render, unmountComponentAtNode} from "react-dom";
import {act} from "react-dom/test-utils";
import ContactList from "./ContactList";
import {mapContactToItemProps} from "../../../features/contacts/ContactList";
import {generateContact} from "../../../features/contacts/generateContact";

describe('<ContactList/>', () => {
    let container: HTMLDivElement;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });

    afterEach(() => {
        unmountComponentAtNode(container);
        container.remove();
    });

    it('Render items?', () => {
        act(() => {
            const getItem = (index: number) => mapContactToItemProps({
                ...generateContact(),
                firstName: 'John',
                lastName: 'Doe'
            });
            const component = (
                <Router>
                    <ContactList
                        itemCount={3}
                        getItem={getItem}
                    />
                </Router>
            );
            render(component, container);
        });
        expect(container.querySelectorAll('li')?.length).toBe(3);
        expect(container
            .querySelector('li:last-child')
            ?.textContent
            ?.startsWith('John Doe')
        ).toBe(true);
    });
});