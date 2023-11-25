import React, { useState, useEffect } from "react";
import { FetchQuery, SORT_BY_OPTIONS } from "../../common/constants";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/Store";

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
  }>({
    sort_by: currentQuery.sort_by as keyof typeof SORT_BY_OPTIONS,
    with_genres: currentQuery.with_genres || [],
  });

  const parameters = useSelector((state: RootState) => state.parameters);

  /*const Backdrop = () => {
    return (
      <div
        className="absolute w-screen h-full bg-black opacity-50 z-20"
        onClick={onClose}
      ></div>
    );
  };*/

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
    } as FetchQuery;

    console.log(formFields);
    newQueryCallback(newQuery);
  }, [formFields]);

  return (
    <>

      <div
        className="absolute top-1/2 left-1/2 overflow-clip h-auto my-auto z-20"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="p-4 bg-white">
          <label htmlFor="sort_by">Sort By: </label>

          <select
            name="sort_by"
            id="sort_by"
            value={formFields.sort_by}
            onChange={handleChange}
          >
            {Object.entries(SORT_BY_OPTIONS).map(([option, value]) => (
              <option key={value} value={option}>
                {value}
              </option>
            ))}
          </select>

          <div className=" h-52 overflow-auto">
            {parameters.genres.map((genre) => (
              <div key={genre.name}>
                <input
                  type="checkbox"
                  value={genre.id}
                  id={genre.name}
                  checked={
                    currentQuery.with_genres?.includes(genre.id) || false
                  }
                  onChange={handleCheckbox}
                />
                <label htmlFor={genre.name}>{genre.name}</label>
                <br />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
