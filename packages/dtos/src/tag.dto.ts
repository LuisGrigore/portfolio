import * as t from "io-ts";

export const TagDTOValidationSchema = t.type({
  id: t.string,
  tag: t.string,
});

export const TagDTOsValidationSchema = t.array(
  TagDTOValidationSchema
);

export type TagDTO = t.TypeOf<typeof TagDTOValidationSchema>;
