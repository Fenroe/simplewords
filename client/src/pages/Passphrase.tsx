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
  numberOfWords: 5,
  personalizePassphrase: false,
  description: "",
};

const Passphrase = () => {
  const [passphrase, setPassphrase] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: defaultFormValues,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const options: PassphraseFormValues = {
          ...values,
        };
        const passphrase: string = await generatePassphrase(options);
        setPassphrase(passphrase);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <section className="passphrase-hero-wrapper">
        <div className="passphrase-hero-inner">
          <h1>
            Need a new password? Our generator creates passphrases that are hard
            to crack and easy to remember
          </h1>
          <span>Generated Passphrase:</span>
          <div className="generated-password-area">
            <h2>{loading === false && passphrase}</h2>
          </div>
        </div>
      </section>
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
          <label htmlFor="numberOfWords">Word count</label>
          <div className="">
            <input
              type="range"
              min={3}
              max={12}
              value={formik.values.numberOfWords}
              onChange={formik.handleChange}
              name="numberOfWords"
            />
            <span>{formik.values.numberOfWords}</span>
          </div>
        </div>
        <div className="">
          <label htmlFor="personalizePassphrase">
            Personalize your passphrase
          </label>
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
        <button type="submit" disabled={loading === true}>
          Generate Passphrase
        </button>
      </form>
      <div className="">
        <h2>{passphrase}</h2>
      </div>
    </div>
  );
};

export default Passphrase;
