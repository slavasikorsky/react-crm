import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClientsRow } from "../../types/types";
import Button from "../UI/Button";
import { Field, Error } from "./styled";

type FormProps = {
	onSubmit: (data: ClientsRow) => Promise<void>;
	values: ClientsRow | undefined;
};

function Form({ onSubmit, values }: FormProps) {
	const { t } = useTranslation();

	const FormSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, t("errors.firstName"))
			.max(50, t("errors.firstName"))
			.required(),
		phone: Yup.string().required(),
		email: Yup.string().email().required(),
		city: Yup.string(),
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	return (
		<Formik
			initialValues={
				values || {
					// bad practice Math.random() for ID
					// but for demp dummy data I think it makes sense
					id: Math.floor(Math.random() * 99999),
					firstName: "",
					email: "",
					phone: "",
					address: {
						city: "",
					},
				}
			}
			validationSchema={FormSchema}
			onSubmit={(values) => {
				setIsSubmitting(true);
				setTimeout(() => {
					onSubmit(values);
				}, 300);
			}}
		>
			{({
				values,
				errors,
				touched,
				handleChange,
				handleBlur,
				handleSubmit,
			}) => (
				<form onSubmit={handleSubmit}>
					{isSubmitting && <p>{t("send")}</p>}
					<Field>
						<label htmlFor="name">
							{t("fields.firstName")}
							<input
								type="text"
								name="firstName"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.firstName}
							/>
						</label>
						<Error>
							{errors.firstName &&
								touched.firstName &&
								t("errors.firstName")}
						</Error>
					</Field>
					<Field>
						<label htmlFor="phone">
							{t("fields.phone")}
							<input
								type="phone"
								name="phone"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.phone}
							/>
						</label>
						<Error>
							{errors.phone && touched.phone && t("errors.phone")}
						</Error>
					</Field>
					<Field>
						<label htmlFor="email">
							{t("fields.email")}
							<input
								type="email"
								name="email"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.email}
							/>
						</label>
						<Error>
							{errors.email && touched.email && t("errors.email")}
						</Error>
					</Field>
					<Field>
						<label htmlFor="address.city">
							{t("fields.city")}
							<input
								type="address.city"
								name="address.city"
								onChange={handleChange}
								onBlur={handleBlur}
								value={values.address?.city}
							/>
						</label>
					</Field>

					<Button type="submit" disabled={isSubmitting}>
						{t("submit")}
					</Button>
				</form>
			)}
		</Formik>
	);
}
export default Form;
