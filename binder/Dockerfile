FROM alpine:3.16.2

ARG NB_USER=jovyan
ARG NB_UID=1000
ENV USER ${NB_USER}
ENV NB_UID ${NB_UID}
ENV HOME /home/${NB_USER}

RUN apk add py3-pip py3-psutil chafa imagemagick \
 && pip install --no-cache-dir euporie ipykernel jupyter-server \
 && adduser --disabled-password --uid ${NB_UID} ${NB_USER}

COPY . ${HOME}

RUN pip install --no-cache-dir -e ${HOME} \
 && ln -s /usr/bin/jupyter-server /usr/bin/jupyter-notebook

USER root
RUN chown -R ${NB_UID} ${HOME}
USER ${NB_USER}
WORKDIR ${HOME}
