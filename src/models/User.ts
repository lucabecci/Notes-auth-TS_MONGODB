import { Schema, Document, model, SchemaDefinition } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  comparePassword: (password: string) => boolean
}

class UserSchema {
  _schemaDefinition: SchemaDefinition;
  _userSchema: Schema;
  constructor() {
    this._schemaDefinition = {
      name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
      },
      username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
      },
    };
    this._userSchema = new Schema(this._schemaDefinition, { timestamps: true });

    this.passwordConfigurations();
    this.compare()
  }

  private passwordConfigurations() {
    //encrypt
    this._userSchema.pre<IUser>("save", async function (next) {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      const user = this;
      if (!user.isModified("password")) return next();

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;
      next();
    });
  }

  private compare(): void {
    //compare and check
    this._userSchema.methods.comparePassword = async function (
      password: string
    ): Promise<boolean> {
      return await bcrypt.compare(password, this.password);
    };
  }
}

const userSchema = new UserSchema();

export default model<IUser>("User", userSchema._userSchema);
