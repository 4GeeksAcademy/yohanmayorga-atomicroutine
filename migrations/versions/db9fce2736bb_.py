"""empty message

Revision ID: db9fce2736bb
Revises: e1e9000be809
Create Date: 2023-11-04 06:11:06.277144

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'db9fce2736bb'
down_revision = 'e1e9000be809'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('journal', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.VARCHAR(length=120),
               type_=sa.String(length=20000),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('journal', schema=None) as batch_op:
        batch_op.alter_column('text',
               existing_type=sa.String(length=20000),
               type_=sa.VARCHAR(length=120),
               existing_nullable=True)

    # ### end Alembic commands ###