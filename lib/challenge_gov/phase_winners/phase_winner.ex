defmodule ChallengeGov.PhaseWinners.PhaseWinner do
  @moduledoc """
  Challenge phase winner schema
  """

  use Ecto.Schema

  import Ecto.Changeset

  alias ChallengeGov.Repo
  alias Stein.Storage
  alias ChallengeGov.Challenges.Phase
  alias ChallengeGov.PhaseWinners.Winner

  @type t :: %__MODULE__{}

  @statuses [
    "draft",
    "review",
    "published"
  ]

  schema "phase_winners" do
    # Associations
    belongs_to(:phase, Phase)
    has_many(:winners, Winner)

    # Fields
    field(:uuid, Ecto.UUID, autogenerate: true)
    field(:status, :string, default: "draft")

    # Rich text
    field(:overview, :string)
    field(:overview_delta, :string)

    # Uploads
    field(:overview_image_path, :string)

    # Timestamps
    timestamps(type: :utc_datetime_usec)
  end

  def create_changeset(struct, phase, params \\ %{}) do
    struct
    |> cast(params, [
      :status,
      :overview,
      :overview_delta,
      :overview_image_path
    ])
    |> put_change(:phase_id, phase.id)
    |> unique_constraint(:phase_id)
  end

  def update_changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [
      :status,
      :overview,
      :overview_delta,
      :overview_image_path
    ])
  end

  def overview_image_changeset(struct, path) do
    struct
    |> change()
    |> put_change(:overview_image_path, path)
  end
end
