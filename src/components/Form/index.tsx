import { Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ClientsRow } from "../../types/types";

type FormProps = {
	onSubmit: (data: ClientsRow) => Promise<void>;
	values: ClientsRow | undefined;
};

const Form = ({ onSubmit, values }: FormProps) => {
	const { t } = useTranslation();

	const FormSchema = Yup.object().shape({
		firstName: Yup.string()
			.min(2, t("errors.firstName"))
			.max(50, t("errors.firstName"))
			.required(),
		phone: Yup.string().required(),
		email: Yup.string().email().required(),
	});

	const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	return (
		<Formik
			initialValues={
				values || {
					// bad practice Math.random() but for dummy data I think it makes sense
					id: Math.floor(Math.random() * 99999),
					firstName: "",
					email: "",
					phone: "",
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
					<div>
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
						<p>
							{errors.firstName &&
								touched.firstName &&
								t("errors.firstName")}
						</p>
					</div>
					<div>
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
						<p>
							{errors.phone && touched.phone && t("errors.phone")}
						</p>
					</div>
					<div>
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
						<p>
							{errors.email && touched.email && t("errors.email")}
						</p>
					</div>

					<button type="submit" disabled={isSubmitting}>
						{t("submit")}
					</button>
				</form>
			)}
		</Formik>
	);
};
export default Form;
