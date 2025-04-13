import Problem from "@/server/models/Problem.model";
import Tag from "@/server/models/Tag.model";
import mongoose from "mongoose";
interface ITag {
  tag_name: string;
  tag_type: string; // atomic or global
}

export const addManyTags = async (
  tags: ITag[],
  user_id: string,
  session: mongoose.ClientSession,
  problem_id: string | null = null
) => {
  try {
    // remove duplicates from the tags array
    tags = tags.filter(
      (tag, index, self) =>
        index ===
        self.findIndex(
          (t) => t.tag_name.toLowerCase() === tag.tag_name.toLowerCase()
        )
    );

    // let's first fetch all the tags from the database that are of specific user and that are of type global
    const existingTags = await Tag.find({});

    const existingTagNames = existingTags.map((tag) =>
      tag.tag_name.toLowerCase()
    );

    const newTags = tags.filter(
      (tag) =>
        !existingTagNames.includes(tag.tag_name.toLowerCase()) &&
        tag.tag_type === "atomic"
    );

    let createdTags: { tag_name: string; tag_type: string; _id: string }[] = [];

    if (newTags.length != 0) {
      createdTags = (
        await Tag.insertMany(
          newTags.map((tag) => ({
            ...tag,
            user_id: user_id,
            tag_type: "atomic",
          })),
          { session }
        )
      ).map((tag) => ({
        tag_name: tag.tag_name,
        tag_type: tag.tag_type,
        _id: tag._id,
      }));
    }

    const beforeTags = existingTags.map((tag) => ({
      tag_name: tag.tag_name,
      tag_type: tag.tag_type,
      _id: tag._id,
    }));

    const allTags = [...beforeTags, ...createdTags];

    // if problem_id is provided, then we need to add the tags to the problem as well

    if (problem_id) {
      // create lookups for only those tags taht are provided by the user
      const problemTags = allTags.filter((tag) =>
        tags.some(
          (t) => t.tag_name.toLowerCase() === tag.tag_name.toLowerCase()
        )
      );

      // add the tags to the problem
      await Problem.updateOne(
        { _id: problem_id },
        { $addToSet: { tags: problemTags } },
        { session }
      );
      return problemTags;
    }

    return createdTags;
  } catch (error) {
    console.error("Error in addManyTags: ", error);
    throw new Error("Error in adding tags");
  }
};