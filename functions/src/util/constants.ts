import {ValueTransformer} from "typeorm";
import {format} from "date-fns";

export const NUM_CALLS_PER_SEC = 2;

export const dateTimeTransformer: ValueTransformer = {
  to: (value: any) => value,
  from: (value: any) => value && format(new Date(value),"yyyy-MM-dd HH:mm:ss")
}
