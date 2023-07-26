import React from 'react';
import { render, screen } from '@testing-library/react';
import ReplaceTextToLink from './ReplaceTextToLink';


describe('ReplaceTextToLink', () => {

  test('should replace a telephone number with a link', () => {
    const text = '（環境業務課）087-834-0389'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.getByRole('link', { name: /087-834-0389/i});
    expect(linkElement).toBeInTheDocument();

    const textElement = screen.getByText(/（環境業務課）/i);
    expect(textElement).toBeInTheDocument();
  });

  test('should replace multiple telephone numbers with links', () => {
    const text = '（環境業務課）087-834-0389（環境業務課）087-834-0389'
    render(<ReplaceTextToLink text={text} />);

    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(2);
  });

  test('should not replace a no hyphen telephone number with a link', () => {
    const text = '（環境業務課）0878340389'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();
  });

  test('should not replace without 市外局番', () => {
    const text = '（環境業務課）834-0389'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();

    const textElement = screen.getByText(/（環境業務課）834-0389/i);
    expect(textElement).toBeInTheDocument();
  });

  test('should not replace invalid telephone number', () => {
    const text = '0120-123-456-789'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.queryByRole('link');
    expect(linkElement).not.toBeInTheDocument();

    const textElement = screen.getByText(/0120-123-456-789/i);
    expect(textElement).toBeInTheDocument();
  });

  test('replace url to link', () => {
    const text = 'http://www.city.takamatsu.kagawa.jp（高松市）'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.getByRole('link', { name: /http:\/\/www.city.takamatsu.kagawa.jp/i});
    expect(linkElement).toBeInTheDocument();

    const textElement = screen.getByText(/（高松市）/i);
    expect(textElement).toBeInTheDocument();
  });

  test('should replace multiple urls with links', () => {
    const text = 'http://www.city.takamatsu.kagawa.jp（高松市）http://www.city.takamatsu.kagawa.jp（高松市）'
    render(<ReplaceTextToLink text={text} />);

    const linkElements = screen.getAllByRole('link');
    expect(linkElements.length).toBe(2);
  });

  test('should replace a url with query to link', () => {
    const text = 'http://www.city.takamatsu.kagawa.jp?query=1'
    render(<ReplaceTextToLink text={text} />);

    const linkElement = screen.getByRole('link', { name: /http:\/\/www.city.takamatsu.kagawa.jp\?query=1/i});
    expect(linkElement).toBeInTheDocument();
  });

});
