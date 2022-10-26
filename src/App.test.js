import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import Header from "./Header";


it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
});

test("Baslik kontrol edilmeli", () => {
  render(<Header />); // Header tag calistirdik
  const title = screen.getByText(/Emoji Search/i);  // baslik kismini sectik
  expect(title).toBeInTheDocument();  //  baslik kismi ekranda bulunuyor mu sorguladik
});

test("Uygulama ilk acildiginda emoji listesinin basarili sekilde render edilmesi", () => {
  render(<App />);  // App tagini calistirdik
  const items = screen.getAllByText(/Click to copy emoji/i);  // click to copy emoji oldugu kismi items atadik
  const item = screen.getByText("Smile"); // smile emojisini item atadik
  expect(items.length).toEqual(20); // items toplam 20 adet oldugunu sorguladik
  expect(item).toBeInTheDocument(); // item ekranda gözüküyor mu sorguladik
});

test("Bir filtreleme işlemi yapildiginda, emoji listesinin bu filtreye uygun sekilde render edilmesi", () => {
  render(<App />);
  let input = screen.getByPlaceholderText("Search for emoji");   // placeholderdan inputu atadik
  userEvent.type(input, "yu");  // inputa yu yazdirdik
  let item = screen.getByText(/yum/i);  // ekrandaki yum yazani item atadik
  expect(item).toBeInTheDocument(); // item ekranda olup olmadigini sorguladik
});

test("Liste üzerinden herhangi bir emojiye tikladiginda, ilgili emojinin kopyalanmasi", () => {
  render(<App />);
  const clicks = screen.getAllByTestId("row");
  expect(clicks[0]).toHaveAttribute("data-clipboard-text")
});
