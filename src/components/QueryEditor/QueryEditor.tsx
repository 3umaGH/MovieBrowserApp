import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IoMdClose } from "react-icons/io";

import {
  COUNTRY_OPTIONS,
  FetchQuery,
  SORT_BY_OPTIONS,
} from "../common/constants";
import { RootState } from "../../app/Store";
import { objectsAreEqualIgnoringProperty } from "../../utils";

export const QueryEditor = ({
  currentQuery,
  onClose,
  newQueryCallback,
}: {
  currentQuery: FetchQuery;
  onClose: () => void;
  newQueryCallback: (query: FetchQuery) => void;
}) => {
  const [formFields, setFormFields] = useState<{
    sort_by: keyof typeof SORT_BY_OPTIONS;
    with_genres?: number[];
    origin_country?: keyof typeof COUNTRY_OPTIONS;
  }>({
    sort_by: currentQuery.sort_by as keyof typeof SORT_BY_OPTIONS,
    with_genres: currentQuery.with_genres || [],
    origin_country: currentQuery.origin_country || "ALL",
  });

  const parameters = useSelector((state: RootState) => state.parameters);

  const Backdrop = () => {
    return (
      <div
        className="absolute w-screen h-full bg-gray-900 opacity-30 z-20 blur-3xl"
        onClick={onClose}
      ></div>
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormFields((prevFields) => ({
      ...prevFields,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genreId = parseFloat(e.target.value);

    setFormFields((prevFields) => {
      const updatedGenres = prevFields.with_genres || [];

      if (e.target.checked) {
        return {
          ...prevFields,
          with_genres: [...updatedGenres, genreId],
        };
      } else {
        return {
          ...prevFields,
          with_genres: updatedGenres.filter((id) => id !== genreId),
        };
      }
    });
  };

  useEffect(() => {
    const newQuery = {
      sort_by: formFields.sort_by,
      with_genres: formFields.with_genres,
      ...(formFields.origin_country !== undefined && // Conditionally adding origin country if it's not undefined and is not All countries to the fetch query.
        formFields.origin_country !== "ALL" && {
          origin_country: formFields.origin_country,
        }),
    } as FetchQuery;

    if (!objectsAreEqualIgnoringProperty(newQuery, currentQuery, "page"))
      newQueryCallback(newQuery);
  }, [formFields]);

  return (
    <>
      <Backdrop />
      <div
        className="absolute w-5/6 md:w-max top-1/2 left-1/2 overflow-clip h-auto my-auto z-20 "
        style={{
          transform: "translate(-50%, -50%)",
          marginTop: "5.6rem",
        }}
      >
        <div className="absolute top-2 -right-3 z-20 hover:scale-150 active:scale-125 transition-transform mx-5 cursor-pointer">
          <IoMdClose color="white" size={30} onClick={onClose} />
        </div>

        <div
          className="p-4 lg:p-8 animate-fadein rounded-lg "
          style={{ backgroundColor: "rgba(25, 25, 26,1)" }}
        >
          <div className="mb-2 flex flex-col gap-2">
            <label className="mr-4 font-roboto text-gray-200" htmlFor="sort_by">
              Sort By:
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="sort_by"
              id="sort_by"
              value={formFields.sort_by}
              onChange={handleChange}
            >
              {Object.entries(SORT_BY_OPTIONS).map(([option, value]) => (
                <option
                  className="text-lg text-gray-300 font-roboto"
                  key={value}
                  value={option}
                >
                  {value}
                </option>
              ))}
            </select>

            <label
              className="mr-4 font-roboto text-gray-200"
              htmlFor="origin_country"
            >
              Origin Country:
            </label>

            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              name="origin_country"
              id="origin_country"
              value={formFields.origin_country || "ALL"}
              onChange={handleChange}
            >
              {Object.entries(COUNTRY_OPTIONS).map(([option, value]) => (
                <option
                  className="text-lg text-gray-300 font-roboto"
                  key={value}
                  value={option}
                >
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <label className="font-roboto text-gray-200" htmlFor="genres">
              Genres:
            </label>
          </div>

          <div
            id="genres"
            className="overflow-auto border-gray-400 border-2 rounded-lg py-2 px-2 flex flex-wrap flex-col"
            style={{ height: "240px" }}
          >
            {parameters.genres.map((genre) => (
              <div key={genre.name}>
                <input
                  className="mx-2 mr-[2px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-blue-500 checked:bg-blue-500 checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                  type="checkbox"
                  value={genre.id}
                  id={genre.name}
                  checked={
                    currentQuery.with_genres?.includes(genre.id) || false
                  }
                  onChange={handleCheckbox}
                />
                <label
                  className="ms-2 text-sm font-roboto text-gray-200"
                  htmlFor={genre.name}
                >
                  {genre.name}
                </label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
