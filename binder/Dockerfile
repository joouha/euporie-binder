FROM alpine:3.16.2

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

RUN apk add sudo py3-pip py3-psutil py3-pandas py3-matplotlib chafa imagemagick exa \
 && pip install --no-cache-dir ipykernel ipywidgets tqdm rich \
 && adduser --disabled-password --uid ${NB_UID} ${NB_USER}

COPY --chown=${NB_UID} . ${HOME}
RUN pip install --no-cache-dir -e ${HOME} \
 && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-notebook

USER ${NB_USER}
WORKDIR ${HOME}
