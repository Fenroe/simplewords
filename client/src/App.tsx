import { useState } from "react";
import { generatePassphrase } from "@/utilities";
import { useFormik } from "formik";

interface PassphraseFormValues {
  uppercase: boolean;
  numbers: boolean;
  special: boolean;
  numberOfWords: number;
  personalizePassphrase: boolean;
  description: string;
}

const defaultFormValues: PassphraseFormValues = {
  uppercase: false,
  numbers: false,
  special: false,
  numberOfWords: 4,
  personalizePassphrase: false,
  description: ""
};

const App = () => {
  const [passphrase, setPassphrase] = useState<string>("");

  const formik = useFormik({
    initialValues: defaultFormValues,
    onSubmit: async (values) => {
      const options: PassphraseFormValues = {
        ...values,
      };
      const passphrase: string = await generatePassphrase(options);
      setPassphrase(passphrase);
    },
  });

  return (
    <div>
      <h1>Passphrase generator</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className="">
          <label htmlFor="uppercase">Needs uppercase letters</label>
          <input
            type="checkbox"
            checked={formik.values.uppercase}
            onChange={formik.handleChange}
            name="uppercase"
          />
        </div>
        <div className="">
          <label htmlFor="numbers">Needs numbers</label>
          <input
            type="checkbox"
            checked={formik.values.numbers}
            onChange={formik.handleChange}
            name="numbers"
          />
        </div>
        <div className="">
          <label htmlFor="special">Needs special characters</label>
          <input
            type="checkbox"
            checked={formik.values.special}
            onChange={formik.handleChange}
            name="special"
          />
        </div>
        <div className="">
          <label htmlFor="numberOfWords">Number of words</label>
          <input
            type="number"
            value={formik.values.numberOfWords}
            onChange={formik.handleChange}
            name="numberOfWords"
          />
        </div>
        <div className="">
          <label htmlFor="personalizePassphrase">Personalize your passphrase</label>
          <input
            type="checkbox"
            checked={formik.values.personalizePassphrase}
            onChange={formik.handleChange}
            name="personalizePassphrase"
          />
        </div>
        <div className="">
          <label htmlFor="description">Describe yourself</label>
          <textarea
            value={formik.values.description}
            onChange={formik.handleChange}
            name="description"
          />
        </div>
        <button type="submit">Generate Passphrase</button>
      </form>
      <div className="">
        <h2>{passphrase}</h2>
      </div>
    </div>
  );
};

export default App;
