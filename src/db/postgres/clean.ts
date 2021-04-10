import pool from "./index";

const cleanAllTables = async () => {
  await pool.query("DROP TABLE posts;");
  await pool.query("DROP TABLE group_user_approvals;");
  await pool.query("DROP TABLE group_policies;");
  await pool.query("DROP TABLE user_sym_keys;");
  await pool.query("DROP TABLE user_rsa_keys;");
  await pool.query("DROP TABLE access_tokens;");
  await pool.query("DROP TABLE users;");
  await pool.query("DROP TABLE migrations;");
  process.exit();
};

cleanAllTables();
