FROM alpine:3.16.2

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

RUN apk add sudo py3-pip py3-psutil py3-pandas py3-matplotlib chafa imagemagick exa \
 && pip install --no-cache-dir ipykernel ipywidgets jupyter-server tqdm rich \
 && adduser --disabled-password --uid ${NB_UID} ${NB_USER}

COPY --chown=${NB_UID} . ${HOME}
RUN pip install --no-cache-dir -e ${HOME} \
 && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-notebook
 # && touch /usr/bin/jupyter-server \
 # && rm /usr/bin/jupyter-server \
 # && mv /usr/bin/jupyter-lab /usr/bin/jupyter-lab-original \
 # && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-lab \
 # && mv /usr/bin/jupyter-server /usr/bin/jupyter-server-original \
 # && ln -s /usr/bin/jupyter-euporie /usr/bin/jupyter-server \

USER ${NB_USER}
WORKDIR ${HOME}
