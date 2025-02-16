import { faker } from "@faker-js/faker/locale/en";
import { render, screen } from "testing";
import { PartialProps } from "testing/types";
import { Field } from ".";

const renderField = (props: PartialProps<typeof Field> = {}) =>
  render(
    <Field
      handleChange={props.handleChange || vi.fn()}
      id={props.id || "id"}
      inputName={props.inputName || "inputName"}
      type={props.type || "type"}
      value={props.value || ""}
      disabled={props.disabled || false}
    />
  );

describe("Field", () => {
  it("should render the input name as the label", () => {
    const inputName = faker.lorem.word();
    renderField({ inputName });

    expect(screen.getByLabelText(inputName)).toBeInTheDocument();
  });

  it("should render the input type", () => {
    const type = faker.lorem.word();
    renderField({ type });

    expect(screen.getByText(type)).toBeInTheDocument();
  });

  it("should render the input value", () => {
    const value = faker.lorem.word();
    renderField({ value });

    expect(screen.getByDisplayValue(value)).toBeInTheDocument();
  });

  it("should render a disabled input", () => {
    const inputName = faker.lorem.word();
    renderField({ disabled: true, inputName });

    expect(screen.getByLabelText(inputName)).toBeDisabled();
  });

  it("should call the handleChange function when the input value changes", async () => {
    const inputName = faker.lorem.word();
    const handleChange = vi.fn();

    const { user } = renderField({ handleChange, inputName });

    const input = screen.getByLabelText(inputName);
    const value = faker.lorem.word();

    await user.click(input);
    await user.paste(value);

    expect(handleChange).toHaveBeenCalled();
  });
});
