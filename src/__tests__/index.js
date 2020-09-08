import React from "react";
import {
  render,
  waitForElement,
  screen,
  fireEvent,
} from "@testing-library/react";
import App from "../App";

//Testeo que la aplicacion renderice sin problemas.
test("home works as expected ", async () => {
  const { container } = render(<App />);
  const gifLink = await waitForElement(() =>
    container.querySelector(".ListOfGifs-item")
  );
  expect(gifLink).toBeVisible();
});

test("search form coudl be used", async () => {
  render(<App />);
  const input = await screen.findByRole("textbox");
  const button = await screen.findByRole("button");

  fireEvent.change(input, { target: { value: "Boca juniors" } });
  fireEvent.click(button);

  const title = await screen.findByText("Boca Juniors");

  expect(title).toBeVisible();
});
