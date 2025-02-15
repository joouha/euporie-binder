FROM python:3.13-alpine

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

# Set environment variables for the UV tool configuration
# Enable bytecode compilation for performance
ENV UV_COMPILE_BYTECODE=1
# Use the system Python interpreter
ENV UV_SYSTEM_PYTHON=1
# Set the project environment path
ENV UV_PROJECT_ENVIRONMENT="/usr/local/"
# Use copy mode for linking dependencies
ENV UV_LINK_MODE=copy

# Copy the UV tool from the specified image to the /bin directory
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

            # py3-psutil py3-pandas py3-matplotlib  py3-tqdm py3-rich \
            # chafa imagemagick exa \
RUN apk update \
 && apk add py3-ipykernel jupyter-server \
 && adduser --disabled-password --uid ${NB_UID} ${NB_USER}

# Install project dependencies using UV, leveraging cache for efficiency
RUN --mount=type=cache,target=/root/.cache/uv \
    --mount=type=bind,source=uv.lock,target=uv.lock \
    --mount=type=bind,source=pyproject.toml,target=pyproject.toml \
    uv sync --no-dev --frozen --no-install-project

COPY . ${HOME}
WORKDIR ${HOME}

RUN --mount=type=cache,target=/root/.cache/uv \
    uv --version && pwd && uv sync --no-dev --frozen \
 && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-notebook \
 && mv /usr/bin/jupyter-server /usr/bin/jupyter-server-original \
 && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-server \
 && chown -R ${NB_UID} ${HOME}

USER ${NB_USER}
