import { Attribute } from '@/pages/song/components/Attribute/Attribute';
import { store } from '@/store';
import { renderWithRematchStore } from '@/tests/renderWithRematchStore';
import { screen } from '@testing-library/react';

describe('Attribute unit', () => {
  const name = 'test attribute';
  const description = 'test description';

  beforeEach(() => {
    renderWithRematchStore(<Attribute name={name} description={description} />, store);
  });

  it('renders the attribute name and description', () => {
    const attributeName = screen.getByTestId('attribute-name');
    const attributeDescription = screen.getByTestId('attribute-description');
    expect(attributeName).toHaveTextContent(name);
    expect(attributeDescription).toHaveTextContent(description);
  });
});
